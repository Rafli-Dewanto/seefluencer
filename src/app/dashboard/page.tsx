import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db/drizzle';
import { Courses, UserProgress, Chapters, Lessons } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const progress = await db
    .select({
      lessonId: UserProgress.lessonId,
      completed: UserProgress.completed,
      lessonTitle: Lessons.title,
      courseTitle: Courses.title,
      courseSlug: Courses.slug,
    })
    .from(UserProgress)
    .innerJoin(Lessons, eq(UserProgress.lessonId, Lessons.id))
    .innerJoin(Chapters, eq(Lessons.chapterId, Chapters.id))
    .innerJoin(Courses, eq(Chapters.courseId, Courses.id))
    .where(eq(UserProgress.userId, session.user.id));

  const courses = await db
    .select()
    .from(Courses)
    .where(eq(Courses.status, 'published'));

  const completedLessons = progress.filter((p) => p.completed).length;
  const totalLessons = progress.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session.user.name}!
            </h1>
            <p className="text-gray-600 mt-2">Continue your learning journey</p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Completed Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons}</div>
              <p className="text-sm text-gray-600">
                out of {totalLessons} lessons
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalLessons > 0
                  ? Math.round((completedLessons / totalLessons) * 100)
                  : 0}
                %
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-sm text-gray-600">courses to explore</p>
            </CardContent>
          </Card>
        </div>

        {progress.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recent Progress
            </h2>
            <div className="space-y-4">
              {progress.slice(0, 5).map((item) => (
                <Card key={item.lessonId}>
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <h3 className="font-semibold">{item.lessonTitle}</h3>
                      <p className="text-sm text-gray-600">
                        {item.courseTitle}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          item.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.completed ? 'Completed' : 'In Progress'}
                      </span>
                      <Link href={`/courses/${item.courseSlug}`}>
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/courses/${course.slug}`}>
                    <Button className="w-full">
                      {course.isFree ? 'Start Learning' : 'View Course'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
