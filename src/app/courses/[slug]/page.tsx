import { notFound } from 'next/navigation';
import { db } from '@/db/drizzle';
import { Courses, Chapters, Lessons, UserProgress } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ChevronsLeft, PlayCircle } from 'lucide-react';
import { CourseComingSoon } from '@/components/courses/no-content';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const courseData = await db
    .select({
      course: Courses,
      chapter: Chapters,
      lesson: Lessons,
    })
    .from(Courses)
    .innerJoin(Chapters, eq(Courses.id, Chapters.courseId))
    .innerJoin(Lessons, eq(Chapters.id, Lessons.chapterId))
    .where(eq(Courses.slug, slug))
    .orderBy(Chapters.sortOrder, Lessons.sortOrder);

  if (courseData.length === 0) {
    return (
      <CourseComingSoon
        title="Course Coming Soon"
        description="This course will be available soon. Stay tuned!"
      />
    );
  }

  const course = courseData[0].course;

  const chaptersMap: Map<
    string,
    (typeof courseData)[0]['chapter'] & {
      lessons: (typeof courseData)[0]['lesson'][];
    }
  > = new Map();
  courseData.forEach((item) => {
    if (!chaptersMap.has(item.chapter.id)) {
      chaptersMap.set(item.chapter.id, {
        ...item.chapter,
        lessons: [],
      });
    }
    if (item.lesson)
      chaptersMap.get(item.chapter.id)!.lessons.push(item.lesson);
  });
  const chapters = Array.from(chaptersMap.values());

  let progress: Record<string, boolean> = {};
  if (userId) {
    const userProgress = await db
      .select()
      .from(UserProgress)
      .where(eq(UserProgress.userId, userId));

    progress = userProgress.reduce(
      (acc, p) => {
        acc[p.lessonId] = p.completed || false;
        return acc;
      },
      {} as Record<string, boolean>
    );
  }

  const totalLessons = courseData.length;
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>

          {userId && (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Progress: {completedLessons} of {totalLessons} lessons
                  completed
                </span>
                <div className="flex-1 max-w-xs">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-semibold">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <section className="mt-6">
                <Link
                  href={`/courses`}
                  className="flex justify-start items-center space-x-2"
                >
                  <ChevronsLeft />
                  <p>Back to Courses</p>
                </Link>
              </section>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {chapters.map((chapter) => (
            <Card key={chapter.id}>
              <CardHeader>
                <CardTitle>{chapter.title}</CardTitle>
                {chapter.description && (
                  <CardDescription>{chapter.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapter.lessons.map((lesson) => {
                    const isCompleted = progress[lesson.id];
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <PlayCircle className="h-5 w-5 text-gray-400" />
                          )}
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-gray-600">
                              {lesson.type === 'video'
                                ? 'Video'
                                : lesson.type === 'text'
                                  ? 'Reading'
                                  : 'Quiz'}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                        >
                          <Button variant="outline" size="sm">
                            {isCompleted ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
