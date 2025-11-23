import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/db/drizzle';
import { Courses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

export default async function Home() {
  const courses = await db
    .select()
    .from(Courses)
    .where(eq(Courses.status, 'published'))
    .limit(6);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo.webp"
                alt="Seefluencer Logo"
                quality={75}
                width={184}
                height={32}
              />
            </div>
            <nav className="flex space-x-4 justify-center items-center">
              <Link
                href="/courses"
                className="text-gray-600 hover:text-gray-900"
              >
                Courses
              </Link>
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Learn from the Best
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium courses taught by industry experts. Start your
            learning journey today.
          </p>
          <div className="mt-8">
            <Link href="/courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Featured Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {course.isFree ? 'Free' : 'Premium'}
                      </span>
                      <Link href={`/courses/${course.slug}`}>
                        <Button variant="outline">View Course</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No courses available yet.
                </p>
                <p className="text-gray-400 mt-2">
                  Check back soon for new content!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
