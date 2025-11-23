'use client';

import { toggleLessonCompletion } from '@/actions/lessons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CompleteLessonButtonProps {
  userId: string;
  lessonId: string;
  initialCompleted: boolean;
}

export function CompleteLessonButton({
  userId,
  lessonId,
  initialCompleted,
}: CompleteLessonButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await toggleLessonCompletion(userId, lessonId, !isCompleted);
      setIsCompleted(!isCompleted);
    } catch (err) {
      console.error(err);
      alert('Failed to update lesson progress.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading} variant="default">
      {loading
        ? 'Updating...'
        : isCompleted
          ? 'Mark as Incomplete'
          : 'Mark as Complete'}
    </Button>
  );
}
