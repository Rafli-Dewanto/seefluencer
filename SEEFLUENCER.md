# Full Stack Engineer Hiring Challenge

## 🎯 Challenge Overview

Build a **Course Learning Platform MVP** similar to our existing platform. This challenge will test your ability to work with modern full-stack technologies, implement core features, and deliver a production-ready application.

**Time Limit:** 7 days from assignment date

---

## 📋 Tech Stack Requirements

You **must** use the following technologies (matching our production stack):

### Frontend & Framework

- **Next.js 15.x** (App Router) - Use the latest stable version
- **React 19.x**
- **TypeScript** (strict mode)
- **Tailwind CSS 4.x** for styling

### Backend & Database

- **PostgreSQL** as the database
- **Drizzle ORM** for database management
- **Next.js Server Actions** for API endpoints (preferred over Route Handlers where possible)
- **NextAuth.js v4** for authentication

### Additional Libraries

- **react-hot-toast** or similar for notifications
- **date-fns** for date manipulation
- Any UI component library (shadcn/ui, Radix UI, or custom components)
- **Video.js** or similar for video playback (if implementing video lessons)

### Package Manager

- Use **pnpm** (preferred) or npm/yarn

---

## 🏗️ MVP Features to Implement

### 1. Authentication System (Required)

- [ ] User registration with email/password
- [ ] User login
- [ ] Protected routes using NextAuth middleware
- [ ] User profile page (view and edit)
- [ ] Logout functionality

**User Schema Requirements:**

- Email (unique, required)
- Password (hashed)
- Full name
- Role (student/admin)
- Created/updated timestamps

### 2. Course Management (Required)

- [ ] Admin dashboard to create/edit/delete courses
- [ ] Public course listing page
- [ ] Course detail page with description
- [ ] Course structure: Course → Chapters → Lessons

**Course Schema:**

- Title, description, thumbnail
- Slug (URL-friendly)
- Status (draft/published)
- Sort order
- Created/updated timestamps

**Chapter Schema:**

- Title, description
- Belongs to a Course
- Sort order

**Lesson Schema:**

- Title, description, content
- Belongs to a Chapter
- Type (video/text/quiz)
- Video URL or content text
- Sort order

### 3. User Progress Tracking (Required)

- [ ] Track lesson completion per user
- [ ] Progress indicator on course page
- [ ] Mark lessons as completed
- [ ] Next lesson navigation

**Progress Schema:**

- User ID, Lesson ID
- Completed status
- Completion timestamp

### 4. Quiz System (Required)

- [ ] Create quizzes for lessons (admin)
- [ ] Display quiz questions in lesson
- [ ] Submit quiz answers
- [ ] Calculate score (pass/fail threshold: 70%)
- [ ] Store quiz results

**Quiz Schema:**

- Questions (multiple choice)
- Options per question
- Correct answer
- Points per question

### 5. Subscription/Payment System (Required)

- [ ] Subscription plans (e.g., Monthly, Yearly)
- [ ] Payment integration (use Stripe or Midtrans sandbox/test mode)
- [ ] Subscribe to access courses
- [ ] Check subscription status before accessing content
- [ ] Basic subscription management

**Subscription Schema:**

- User ID, Plan ID
- Start date, End date
- Status (active/expired/cancelled)

### 6. Access Control (Required)

- [ ] Free courses accessible to all
- [ ] Premium courses require active subscription
- [ ] Middleware to check subscription status
- [ ] Show subscription prompt for locked content

### 7. UI/UX (Required)

- [ ] Responsive design (mobile-friendly)
- [ ] Clean, modern interface
- [ ] Loading states
- [ ] Error handling with user-friendly messages
- [ ] Navigation between courses/lessons

---

## 🎨 Design Guidelines

- Create a clean, modern UI using Tailwind CSS
- Use a consistent color scheme
- Implement proper loading states and error messages
- Ensure mobile responsiveness
- Focus on usability and user experience

**Design Inspiration:**

- Similar to modern learning platforms (Udemy, Coursera, etc.)
- Clean course cards, intuitive navigation
- Progress indicators
- Clear call-to-action buttons

---

## 📊 Database Schema

You are expected to design and implement a relational database schema using Drizzle ORM. Key entities:

1. **Users** (authentication & profile)
2. **Courses** (with status, metadata)
3. **Chapters** (belongs to Course)
4. **Lessons** (belongs to Chapter, has type)
5. **UserProgress** (tracks lesson completion)
6. **Quizzes** (questions for lessons)
7. **QuizAttempts** (user quiz submissions)
8. **Subscriptions** (user subscription records)
9. **Plans** (subscription plan definitions)

Use proper foreign keys, indexes, and constraints.

---

## ✅ Acceptance Criteria

Your submission must:

1. ✅ **Run locally** without errors
2. ✅ Include a **README.md** with:
   - Setup instructions
   - Environment variables needed
   - How to seed initial data (admin user, sample courses)
   - How to run migrations
3. ✅ Include a **.env.example** file with required variables
4. ✅ Use **Drizzle migrations** for database schema
5. ✅ Follow **TypeScript best practices** (proper types, no `any`)
6. ✅ Implement **error handling** throughout
7. ✅ Use **Server Actions** for data mutations (preferred)
8. ✅ Implement **proper authentication** checks
9. ✅ Handle **edge cases** (empty states, validation, etc.)
10. ✅ Code is **clean, readable, and well-organized**

---

## 🚀 Bonus Features (Optional)

These are **not required** but will impress us:

- [ ] Course search/filter functionality
- [ ] Course ratings/reviews
- [ ] Email notifications (using Resend or similar)
- [ ] Admin analytics dashboard (course views, completion rates)
- [ ] Video progress tracking (resume from last watched position)
- [ ] Course completion certificates
- [ ] Social sharing
- [ ] Dark mode
- [ ] Unit tests or E2E tests
- [ ] Docker setup for easy deployment

---

## 📝 Submission Guidelines

1. **Create a GitHub repository** with your solution
2. **Make it public** or add us as collaborators
3. **Include a README.md** with:
   - Overview of what you built
   - Setup instructions
   - Screenshots or video demo
   - Any assumptions or design decisions you made
   - Known limitations or issues
4. **Share the repository link** via email

---

## 🔍 Evaluation Criteria

We'll evaluate based on:

### Code Quality (30%)

- Clean, readable, maintainable code
- Proper TypeScript usage
- Consistent code style
- Good project structure

### Functionality (30%)

- All required features working correctly
- Proper error handling
- Edge cases handled
- Security best practices (SQL injection prevention, XSS protection, etc.)

### Technical Implementation (25%)

- Database design (proper relationships, indexes)
- Efficient queries
- Proper use of Next.js features (Server Actions, App Router)
- Authentication implementation

### UI/UX (10%)

- Modern, clean design
- Responsive layout
- Good user experience
- Loading and error states

### Documentation (5%)

- Clear README
- Code comments where needed
- Setup instructions

---

## 💡 Tips

1. **Start with authentication** - Everything else depends on it
2. **Set up database schema early** - Use Drizzle migrations from the start
3. **Create seed data** - Include an admin user and sample courses for testing
4. **Focus on core features first** - Don't get distracted by bonus features
5. **Test your own code** - Make sure everything works before submitting
6. **Use Server Actions** - They're simpler and more integrated with Next.js
7. **Follow Next.js 15 patterns** - Use async Server Components, proper Suspense boundaries
8. **Handle errors gracefully** - Show user-friendly error messages

---

## 🚫 Important Notes

- **Don't copy code directly** from tutorials or other projects
- **Don't use paid services** that require credit cards (use test/sandbox modes)
- **Ask questions** if anything is unclear - we're here to help!
- **Time management** - Focus on delivering working MVP over perfection

---
