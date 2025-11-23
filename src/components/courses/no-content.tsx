import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CourseComingSoonProps {
  title: string;
  description: string;
}

export function CourseComingSoon({
  title,
  description,
}: CourseComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-lg w-full text-center">
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <p className="mt-4 text-gray-600">
            This course will be available soon. Stay tuned!
          </p>
          <Link href="/courses">
            <Button variant="outline" className="mt-6">
              Back to Courses
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
