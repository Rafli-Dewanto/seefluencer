import 'dotenv/config';
import { db } from '@/db/drizzle';
import { Users, Courses, Chapters, Lessons, Plans, Quizzes } from '@/db/schema';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 12);
  await db.insert(Users).values({
    id: nanoid(),
    email: 'admin@seefluencer.com',
    name: 'Admin User',
    password: adminPassword,
    role: 'admin',
  });

  const monthlyPlanId = nanoid();
  const yearlyPlanId = nanoid();

  await db.insert(Plans).values([
    {
      id: monthlyPlanId,
      name: 'Monthly',
      description: 'Access to all premium influencer courses for one month',
      price: 299900,
      duration: 30,
      features: JSON.stringify([
        'Full access to all courses',
        'Certificate of completion',
        'Private creator community',
        'Priority support',
      ]),
    },
    {
      id: yearlyPlanId,
      name: 'Yearly',
      description: 'Access to all premium influencer courses for one year',
      price: 2999000,
      duration: 365,
      features: JSON.stringify([
        'Full access to all courses',
        'Certificate of completion',
        'Private creator community',
        'Priority support',
        'Exclusive yearly masterclass',
      ]),
    },
  ]);

  const influencerCourseId = nanoid();
  const tiktokMiniCourseId = nanoid();

  await db.insert(Courses).values([
    {
      id: influencerCourseId,
      title: 'Complete Content Creator & Influencer Mastery',
      description:
        'Learn how to grow an audience, create viral content, land brand deals, and build a sustainable influencer career.',
      slug: 'content-creator-influencer-mastery',
      status: 'published',
      isFree: false,
      sortOrder: 1,
    },
    {
      id: tiktokMiniCourseId,
      title: 'TikTok Growth Crash Course',
      description: 'A free beginner-friendly crash course to grow on TikTok.',
      slug: 'tiktok-growth-crash-course',
      status: 'published',
      isFree: true,
      sortOrder: 2,
    },
  ]);

  const fundamentalsChapterId = nanoid();
  const contentCreationChapterId = nanoid();

  await db.insert(Chapters).values([
    {
      id: fundamentalsChapterId,
      courseId: influencerCourseId,
      title: 'Influencer Fundamentals',
      description:
        'Understand the creator economy, niches, and how influencers make money.',
      slug: 'influencer-fundamentals',
      sortOrder: 1,
    },
    {
      id: contentCreationChapterId,
      courseId: influencerCourseId,
      title: 'Content Creation Mastery',
      description: 'Create scroll-stopping content for every platform.',
      slug: 'content-creation-mastery',
      sortOrder: 2,
    },
  ]);

  const lesson1Id = nanoid();
  const lesson2Id = nanoid();

  await db.insert(Lessons).values([
    {
      id: lesson1Id,
      chapterId: fundamentalsChapterId,
      title: 'Introduction to the Influencer Industry',
      description:
        'How influencers make money and why the creator economy is booming.',
      content:
        'Influencers are modern digital creators who build trust with an audience. Brands pay influencers for exposure and authentic recommendations...',
      type: 'text',
      slug: 'intro-to-influencer-industry',
      sortOrder: 1,
    },
    {
      id: lesson2Id,
      chapterId: contentCreationChapterId,
      title: 'How to Create Viral Short-Form Videos',
      description: 'The psychology behind viral videos and how to apply it.',
      content:
        'Short-form videos rely on hooks, pacing, storytelling, and retention loops...',
      type: 'video',
      videoUrl: 'https://example.com/viral-video-strategy.mp4',
      slug: 'viral-video-creation',
      sortOrder: 1,
    },
  ]);

  await db.insert(Quizzes).values([
    {
      id: nanoid(),
      lessonId: lesson1Id,
      question: 'What is the main reason brands work with influencers?',
      optionA: 'Influencers can create authentic connections with audiences',
      optionB: 'Influencers replace customer service teams',
      optionC: 'Influencers manage brand websites',
      optionD: 'Influencers produce Hollywood-quality videos',
      correctAnswer: 'A',
      points: 10,
      sortOrder: 1,
    },
  ]);

  console.log('Database seeded successfully!');
}

seed().catch(console.error);
