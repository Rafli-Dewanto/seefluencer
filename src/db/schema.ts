import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
  id: varchar().primaryKey().notNull(),
  email: varchar().notNull().unique(),
  name: varchar(),
  password: varchar().notNull(),
  role: varchar().default('student'),
  emailVerified: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const Courses = pgTable('courses', {
  id: varchar().primaryKey().notNull(),
  title: varchar().notNull(),
  description: text().notNull(),
  thumbnail: varchar(),
  slug: varchar().unique(),
  status: varchar().default('draft'),
  isFree: boolean().default(false),
  sortOrder: integer().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const Chapters = pgTable('chapters', {
  id: varchar().primaryKey().notNull(),
  courseId: varchar()
    .notNull()
    .references(() => Courses.id, { onDelete: 'cascade' }),
  title: varchar().notNull(),
  description: text(),
  slug: varchar(),
  sortOrder: integer().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const Lessons = pgTable('lessons', {
  id: varchar().primaryKey().notNull(),
  chapterId: varchar()
    .notNull()
    .references(() => Chapters.id, { onDelete: 'cascade' }),
  title: varchar().notNull(),
  description: text(),
  content: text(),
  videoUrl: varchar(),
  type: varchar().default('video'),
  slug: varchar(),
  sortOrder: integer().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const UserProgress = pgTable('user_progress', {
  id: varchar().primaryKey().notNull(),
  userId: varchar()
    .notNull()
    .references(() => Users.id, { onDelete: 'cascade' }),
  lessonId: varchar()
    .notNull()
    .references(() => Lessons.id, { onDelete: 'cascade' }),
  completed: boolean().default(false),
  completedAt: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const Quizzes = pgTable('quizzes', {
  id: varchar().primaryKey().notNull(),
  lessonId: varchar()
    .notNull()
    .references(() => Lessons.id, { onDelete: 'cascade' }),
  question: text().notNull(),
  optionA: varchar().notNull(),
  optionB: varchar().notNull(),
  optionC: varchar().notNull(),
  optionD: varchar().notNull(),
  correctAnswer: varchar().notNull(),
  points: integer().default(10),
  sortOrder: integer().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const QuizAttempts = pgTable('quiz_attempts', {
  id: varchar().primaryKey().notNull(),
  userId: varchar()
    .notNull()
    .references(() => Users.id, { onDelete: 'cascade' }),
  lessonId: varchar()
    .notNull()
    .references(() => Lessons.id, { onDelete: 'cascade' }),
  score: integer().notNull(),
  totalPoints: integer().notNull(),
  passed: boolean().default(false),
  answers: jsonb(),
  createdAt: timestamp().defaultNow(),
});

export const Plans = pgTable('plans', {
  id: varchar().primaryKey().notNull(),
  name: varchar().notNull(),
  description: text(),
  price: integer().notNull(),
  duration: integer().notNull(),
  features: jsonb(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const Subscriptions = pgTable('subscriptions', {
  id: varchar().primaryKey().notNull(),
  userId: varchar()
    .notNull()
    .references(() => Users.id, { onDelete: 'cascade' }),
  planId: varchar()
    .notNull()
    .references(() => Plans.id),
  status: varchar().default('active'), // 'active' | 'expired' | 'cancelled'
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
  paymentProvider: varchar(),
  paymentId: varchar(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
