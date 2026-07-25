import { PrismaClient, Role, CourseLevel, CertType, EventType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean existing records in reverse dependency order
  await prisma.calendarEvent.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const studentUser = await prisma.user.create({
    data: {
      name: 'Farel Evan',
      email: 'student@learnos.com',
      password: hashedPassword,
      role: Role.STUDENT,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  });

  const instructorUser = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Chen',
      email: 'instructor@learnos.com',
      password: hashedPassword,
      role: Role.INSTRUCTOR,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Admin LearnOS',
      email: 'admin@learnos.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Akun Pengguna berhasil dibuat.');

  // 3. Create Categories
  const catAi = await prisma.category.create({
    data: { name: 'AI & Data', slug: 'ai-data', icon: 'Brain' },
  });
  const catDev = await prisma.category.create({
    data: { name: 'Development', slug: 'development', icon: 'Code2' },
  });
  const catDesign = await prisma.category.create({
    data: { name: 'Design', slug: 'design', icon: 'Palette' },
  });
  const catCloud = await prisma.category.create({
    data: { name: 'Cloud Computing', slug: 'cloud-computing', icon: 'Cloud' },
  });

  // 4. Create Courses
  const courseGenAI = await prisma.course.create({
    data: {
      title: 'Mastering Generative AI for Enterprise',
      slug: 'mastering-generative-ai-for-enterprise',
      description:
        'Deep dive into deploying LLMs, fine-tuning models, and building scalable AI applications for modern business infrastructure.',
      categoryId: catAi.id,
      categoryName: 'ARTIFICIAL INTELLIGENCE',
      instructorName: 'Dr. Sarah Chen',
      instructorRole: 'Lead AI Researcher, TechCorp',
      price: 299,
      level: CourseLevel.ADVANCED,
      duration: '12 weeks',
      totalLessons: 24,
      isFeatured: true,
      isTrending: true,
      badge: '🔥 Trending',
      coverImage: '/course-generative-ai.png',
      rating: 4.9,
      reviewsCount: '2.4k',
      studentsCount: 15230,
    },
  });

  const courseReact = await prisma.course.create({
    data: {
      title: 'Advanced React Patterns & State Management',
      slug: 'advanced-react-patterns',
      description:
        'Master scalable front-end architecture, performance optimization, custom hooks, and state management.',
      categoryId: catDev.id,
      categoryName: 'SOFTWARE ENGINEERING',
      instructorName: 'Sarah Jenkins',
      instructorRole: 'Principal Frontend Architect',
      price: 149,
      level: CourseLevel.INTERMEDIATE,
      duration: '8 hours',
      totalLessons: 18,
      isFeatured: false,
      isTrending: false,
      badge: 'Pro Included',
      coverImage: '/course-webdev.png',
      rating: 4.8,
      reviewsCount: '1.2k',
      studentsCount: 8420,
    },
  });

  const courseUX = await prisma.course.create({
    data: {
      title: 'UI/UX Principles for Enterprise SaaS',
      slug: 'ui-ux-principles-enterprise',
      description:
        'Learn practical methodologies for conducting impactful user research, design systems, and micro-interactions.',
      categoryId: catDesign.id,
      categoryName: 'DESIGN',
      instructorName: 'Elena Rodriguez',
      instructorRole: 'Staff Product Designer',
      price: 99,
      level: CourseLevel.INTERMEDIATE,
      duration: '5 hours',
      totalLessons: 27,
      isFeatured: false,
      isTrending: false,
      badge: 'Pro Included',
      coverImage: '/course-uiux.png',
      rating: 4.7,
      reviewsCount: '850',
      studentsCount: 6200,
    },
  });

  const courseAWS = await prisma.course.create({
    data: {
      title: 'Introduction to AWS Serverless Architecture',
      slug: 'intro-aws-serverless',
      description:
        'Get started with Lambda, API Gateway, and DynamoDB to build scalable serverless applications.',
      categoryId: catCloud.id,
      categoryName: 'CLOUD COMPUTING',
      instructorName: 'David Kim',
      instructorRole: 'AWS Certified Solutions Architect',
      price: 0,
      level: CourseLevel.BEGINNER,
      duration: '3 hours',
      totalLessons: 12,
      isFeatured: false,
      isTrending: false,
      badge: null,
      coverImage: '/course-aws.png',
      rating: 4.9,
      reviewsCount: '3.1k',
      studentsCount: 19800,
    },
  });

  console.log('✅ Kursus Katalog berhasil dibuat.');

  // 5. Create Enrollments for Farel Evan
  await prisma.enrollment.create({
    data: {
      userId: studentUser.id,
      courseId: courseReact.id,
      progressPercentage: 65,
      completedLessons: 12,
      totalLessons: 18,
      isBookmarked: true,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: studentUser.id,
      courseId: courseGenAI.id,
      progressPercentage: 32,
      completedLessons: 4,
      totalLessons: 24,
      isBookmarked: true,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: studentUser.id,
      courseId: courseUX.id,
      progressPercentage: 89,
      completedLessons: 24,
      totalLessons: 27,
      isBookmarked: false,
    },
  });

  console.log('✅ Enrollments berhasil dibuat.');

  // 6. Create Certificates for Farel Evan
  await prisma.certificate.create({
    data: {
      userId: studentUser.id,
      title: 'Full-Stack Developer Professional',
      subTitle: 'CERTIFICATE OF COMPLETION',
      type: CertType.PROFESSIONAL,
      certNumber: 'FS-2023-884',
      issuedDate: 'October 15, 2023',
    },
  });

  await prisma.certificate.create({
    data: {
      userId: studentUser.id,
      title: 'AI Engineering Specialist',
      subTitle: 'CERTIFICATE OF SPECIALIZATION',
      type: CertType.PROFESSIONAL,
      certNumber: 'AI-2024-112',
      issuedDate: 'January 22, 2024',
    },
  });

  await prisma.certificate.create({
    data: {
      userId: studentUser.id,
      title: 'Advanced React Patterns',
      type: CertType.COURSE,
      certNumber: 'CRS-REACT-099',
      issuedDate: 'Sept 10, 2023',
    },
  });

  console.log('✅ Sertifikat berhasil dibuat.');

  // 7. Create Community Posts
  await prisma.communityPost.create({
    data: {
      authorId: studentUser.id,
      authorName: 'Sarah Jenkins',
      authorRole: 'Student',
      channel: '#CareerAdvice',
      title: 'Preparing for UX Interviews',
      content:
        'Hey everyone! I have my first round interview for a Product Design role next week. What are some common whiteboard challenges they might throw at me? Any tips on structuring my thoughts during the exercise would be highly appreciated!',
      likesCount: 24,
      commentsCount: 8,
    },
  });

  await prisma.communityPost.create({
    data: {
      authorId: instructorUser.id,
      authorName: 'David Chen',
      authorRole: 'Instructor',
      channel: '#General',
      title: 'New Module Release: Advanced React Patterns',
      content:
        'Just uploaded the new module on Advanced React Patterns. We dive deep into Custom Hooks and Context API optimization. Check it out in your dashboard and let me know if you have any questions below!',
      likesCount: 52,
      commentsCount: 19,
    },
  });

  console.log('✅ Post Komunitas berhasil dibuat.');

  // 8. Create Calendar Events
  await prisma.calendarEvent.create({
    data: {
      userId: studentUser.id,
      title: 'React Hooks Deep Dive Live Session',
      dateBadge: 'TODAY',
      dayNumber: '24',
      timeRange: '2:00 PM - 3:30 PM',
      eventType: EventType.LIVE_SESSION,
    },
  });

  await prisma.calendarEvent.create({
    data: {
      userId: studentUser.id,
      title: 'UI Design Systems Workshop',
      dateBadge: 'TOM',
      dayNumber: '25',
      timeRange: '10:00 AM - 11:30 AM',
      eventType: EventType.LIVE_SESSION,
    },
  });

  await prisma.calendarEvent.create({
    data: {
      userId: studentUser.id,
      title: 'Essay Draft Submission',
      dateBadge: 'FRI',
      dayNumber: '28',
      timeRange: 'Due by 11:59 PM',
      eventType: EventType.DEADLINE,
    },
  });

  console.log('🎉 Seeding database selesai sepenuhnya!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
