import { db } from '@/db/drizzle';
import { Courses } from '@/db/schema';
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
import { ChevronsLeft } from 'lucide-react';

export default async function CoursesPage() {
  const courses = await db
    .select()
    .from(Courses)
    .where(eq(Courses.status, 'published'))
    .orderBy(Courses.sortOrder);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-2">
            Discover our premium learning courses
          </p>
          <section className="mt-6">
            <Link
              href={`/dashboard`}
              className="flex justify-start items-center space-x-2"
            >
              <ChevronsLeft />
              <p>Back to home</p>
            </Link>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      course.isFree
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {course.isFree ? 'Free' : 'Premium'}
                  </span>
                </div>
                <Link href={`/courses/${course.slug}`}>
                  <Button className="w-full">
                    {course.isFree ? 'Start Learning' : 'View Course'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No courses available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
