import { CompleteLessonButton } from '@/components/lessons/actions';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/db/drizzle';
import {
  Chapters,
  Courses,
  Lessons,
  QuizAttempts,
  Quizzes,
  Subscriptions,
  UserProgress,
} from '@/db/schema';
import { auth } from '@/lib/auth';
import { and, eq } from 'drizzle-orm';
import { CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

interface LessonPageProps {
  params: Promise<{
    slug: string;
    lessonSlug: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const { lessonSlug } = await params;

  if (!userId) {
    redirect('/auth/signin');
  }

  const lessonData = await db
    .select({
      lesson: Lessons,
      course: Courses,
      chapter: Chapters,
    })
    .from(Lessons)
    .innerJoin(Chapters, eq(Lessons.chapterId, Chapters.id))
    .innerJoin(Courses, eq(Chapters.courseId, Courses.id))
    .where(eq(Lessons.slug, lessonSlug))
    .limit(1);

  if (lessonData.length === 0) {
    notFound();
  }

  const { lesson, course } = lessonData[0];

  if (!course.isFree) {
    const subscription = await db
      .select()
      .from(Subscriptions)
      .where(
        and(
          eq(Subscriptions.userId, userId),
          eq(Subscriptions.status, 'active')
        )
      )
      .limit(1);

    if (subscription.length === 0) {
      redirect('/subscription');
    }
  }

  const progress = await db
    .select()
    .from(UserProgress)
    .where(
      and(eq(UserProgress.userId, userId), eq(UserProgress.lessonId, lesson.id))
    )
    .limit(1);

  const isCompleted = progress.length > 0 && progress[0].completed;

  let quiz = null;
  let quizAttempt = null;

  if (lesson.type === 'quiz') {
    const quizData = await db
      .select()
      .from(Quizzes)
      .where(eq(Quizzes.lessonId, lesson.id))
      .orderBy(Quizzes.sortOrder);

    quiz = quizData;

    const attemptData = await db
      .select()
      .from(QuizAttempts)
      .where(
        and(
          eq(QuizAttempts.userId, userId),
          eq(QuizAttempts.lessonId, lesson.id)
        )
      )
      .limit(1);

    quizAttempt = attemptData.length > 0 ? attemptData[0] : null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href={`/courses/${course.slug}`}
            className="text-blue-600 hover:text-blue-500"
          >
            ← Back to {course.title}
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-gray-600 mt-2">{lesson.description}</p>
          <div className="flex items-center mt-4">
            {isCompleted ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Completed
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <PlayCircle className="h-5 w-5 mr-2" />
                Not started
              </div>
            )}
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            {lesson.type === 'video' && lesson.videoUrl && (
              <div className="mb-6">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={lesson.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {lesson.content && (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </div>
            )}

            {lesson.type === 'quiz' && quiz && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Quiz</h3>
                {quiz.map((q) => (
                  <div key={q.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{q.question}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`q-${q.id}-A`}
                          name={`q-${q.id}`}
                          value="A"
                          disabled={!!quizAttempt}
                          defaultChecked={
                            (quizAttempt?.answers as Record<string, string>)?.[
                              q.id
                            ] === 'A'
                          }
                        />
                        <label htmlFor={`q-${q.id}-A`} className="ml-2">
                          {q.optionA}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`q-${q.id}-B`}
                          name={`q-${q.id}`}
                          value="B"
                          disabled={!!quizAttempt}
                          defaultChecked={
                            (quizAttempt?.answers as Record<string, string>)?.[
                              q.id
                            ] === 'B'
                          }
                        />
                        <label htmlFor={`q-${q.id}-B`} className="ml-2">
                          {q.optionB}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`q-${q.id}-C`}
                          name={`q-${q.id}`}
                          value="C"
                          disabled={!!quizAttempt}
                          defaultChecked={
                            (quizAttempt?.answers as Record<string, string>)?.[
                              q.id
                            ] === 'C'
                          }
                        />
                        <label htmlFor={`q-${q.id}-C`} className="ml-2">
                          {q.optionC}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`q-${q.id}-D`}
                          name={`q-${q.id}`}
                          value="D"
                          disabled={!!quizAttempt}
                          defaultChecked={
                            (quizAttempt?.answers as Record<string, string>)?.[
                              q.id
                            ] === 'D'
                          }
                        />
                        <label htmlFor={`q-${q.id}-D`} className="ml-2">
                          {q.optionD}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}

                {quizAttempt && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Quiz Results</h4>
                    <p>
                      Score: {quizAttempt.score}/{quizAttempt.totalPoints}
                    </p>
                    <p>Status: {quizAttempt.passed ? 'Passed' : 'Failed'}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <CompleteLessonButton
          userId={session.user.id}
          lessonId={lesson.id}
          initialCompleted={!!isCompleted}
        />
      </div>
    </div>
  );
}
