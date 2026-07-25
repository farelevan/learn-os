import { PrismaClient, Role, CourseLevel, CertType, EventType, QuizType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Helper to build quiz questions JSON
function q(
  question: string,
  options: string[],
  correctIndex: number,
): { question: string; options: string[]; correctIndex: number } {
  return { question, options, correctIndex };
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean all tables
  await prisma.quizAttempt.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // ── Users ──────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const studentUser = await prisma.user.create({
    data: {
      name: 'Farel Evan',
      email: 'student@learnos.com',
      password: hashedPassword,
      role: Role.STUDENT,
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  });

  const instructorUser = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Chen',
      email: 'instructor@learnos.com',
      password: hashedPassword,
      role: Role.INSTRUCTOR,
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
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

  console.log('✅ Users created.');

  // ── Categories ─────────────────────────────────────────────
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

  // ── Existing Courses ───────────────────────────────────────
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

  await prisma.course.create({
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

  // ══════════════════════════════════════════════════════════════
  // ★ NEW COURSE: Elementary Web Programming
  // ══════════════════════════════════════════════════════════════
  const courseWebProg = await prisma.course.create({
    data: {
      title: 'Elementary Web Programming',
      slug: 'elementary-web-programming',
      description:
        'Belajar dasar-dasar pemrograman web dari nol. Mulai dari HTML, CSS, hingga JavaScript dasar. Cocok untuk pemula yang ingin membangun website pertamanya.',
      categoryId: catDev.id,
      categoryName: 'WEB DEVELOPMENT',
      instructorName: 'Traversy Media',
      instructorRole: 'Web Development Educator',
      price: 0,
      level: CourseLevel.BEGINNER,
      duration: '6 hours',
      totalLessons: 12,
      isFeatured: false,
      isTrending: false,
      badge: '🆓 Free',
      coverImage: '/course-webdev.png',
      rating: 4.8,
      reviewsCount: '5.2k',
      studentsCount: 32450,
    },
  });

  console.log('✅ Courses created.');

  // ── MODULE 1: Fondasi HTML ─────────────────────────────────
  const mod1 = await prisma.module.create({
    data: {
      courseId: courseWebProg.id,
      title: 'Fondasi HTML',
      description: 'Pelajari struktur dasar halaman web menggunakan HTML5.',
      orderIndex: 1,
    },
  });

  const lesson1_1 = await prisma.lesson.create({
    data: {
      moduleId: mod1.id,
      title: 'HTML Crash Course for Beginners',
      description: 'Pengenalan lengkap HTML: tag, elemen, atribut, dan struktur dokumen.',
      youtubeUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
      duration: '60 min',
      orderIndex: 1,
    },
  });

  const lesson1_2 = await prisma.lesson.create({
    data: {
      moduleId: mod1.id,
      title: 'HTML Forms & Input Elements',
      description: 'Membuat form interaktif: text input, select, checkbox, radio, dan validasi.',
      youtubeUrl: 'https://www.youtube.com/embed/fNcJuPIZ2WE',
      duration: '25 min',
      orderIndex: 2,
    },
  });

  const lesson1_3 = await prisma.lesson.create({
    data: {
      moduleId: mod1.id,
      title: 'Semantic HTML & Accessibility',
      description: 'Menggunakan tag semantik (header, nav, main, article) untuk aksesibilitas.',
      youtubeUrl: 'https://www.youtube.com/embed/kGW8Al_cga4',
      duration: '20 min',
      orderIndex: 3,
    },
  });

  // In-lesson quizzes for Module 1
  await prisma.quiz.create({
    data: {
      lessonId: lesson1_1.id,
      title: 'Quiz: HTML Basics',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa tag yang digunakan untuk membuat paragraf di HTML?', ['<div>', '<p>', '<span>', '<h1>'], 1),
        q('Atribut apa yang digunakan untuk menambahkan link pada tag <a>?', ['src', 'link', 'href', 'url'], 2),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson1_2.id,
      title: 'Quiz: HTML Forms',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Tag apa yang digunakan untuk membuat dropdown list?', ['<input>', '<textarea>', '<select>', '<list>'], 2),
        q('Atribut apa yang membuat input field wajib diisi?', ['placeholder', 'required', 'mandatory', 'validate'], 1),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson1_3.id,
      title: 'Quiz: Semantic HTML',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Tag semantik apa yang digunakan untuk navigasi utama?', ['<div>', '<section>', '<nav>', '<menu>'], 2),
        q('Apa manfaat utama menggunakan semantic HTML?', ['Tampilan lebih bagus', 'Aksesibilitas & SEO lebih baik', 'Loading lebih cepat', 'Tidak ada manfaat'], 1),
      ]),
    },
  });

  // Module 1 Quiz
  await prisma.quiz.create({
    data: {
      moduleId: mod1.id,
      title: 'Module Quiz: Fondasi HTML',
      quizType: QuizType.MODULE,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa kepanjangan dari HTML?', ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'Home Tool Markup Language'], 0),
        q('Tag apa yang digunakan untuk judul terbesar?', ['<h6>', '<title>', '<h1>', '<heading>'], 2),
        q('Elemen HTML mana yang bersifat self-closing?', ['<p>', '<div>', '<img>', '<a>'], 2),
        q('Di mana kita meletakkan tag <title>?', ['<body>', '<head>', '<footer>', '<main>'], 1),
        q('Tag apa untuk membuat daftar berurutan (numbered)?', ['<ul>', '<ol>', '<list>', '<dl>'], 1),
      ]),
    },
  });

  // ── MODULE 2: Styling dengan CSS ───────────────────────────
  const mod2 = await prisma.module.create({
    data: {
      courseId: courseWebProg.id,
      title: 'Styling dengan CSS',
      description: 'Pelajari cara mempercantik halaman web dengan CSS modern.',
      orderIndex: 2,
    },
  });

  const lesson2_1 = await prisma.lesson.create({
    data: {
      moduleId: mod2.id,
      title: 'CSS Crash Course for Beginners',
      description: 'Dasar-dasar CSS: selector, property, value, box model, dan typography.',
      youtubeUrl: 'https://www.youtube.com/embed/yfoY53QXEnI',
      duration: '85 min',
      orderIndex: 1,
    },
  });

  const lesson2_2 = await prisma.lesson.create({
    data: {
      moduleId: mod2.id,
      title: 'CSS Flexbox in 20 Minutes',
      description: 'Menguasai layout Flexbox untuk menyusun elemen secara fleksibel.',
      youtubeUrl: 'https://www.youtube.com/embed/JJSoEo8JSnc',
      duration: '20 min',
      orderIndex: 2,
    },
  });

  const lesson2_3 = await prisma.lesson.create({
    data: {
      moduleId: mod2.id,
      title: 'CSS Grid Layout Crash Course',
      description: 'Memahami CSS Grid untuk layout 2 dimensi yang kompleks.',
      youtubeUrl: 'https://www.youtube.com/embed/jV8B24rSN5o',
      duration: '28 min',
      orderIndex: 3,
    },
  });

  // In-lesson quizzes for Module 2
  await prisma.quiz.create({
    data: {
      lessonId: lesson2_1.id,
      title: 'Quiz: CSS Basics',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Property CSS apa untuk mengubah warna teks?', ['background-color', 'font-color', 'color', 'text-color'], 2),
        q('Apa model CSS yang menentukan ukuran total elemen?', ['Grid Model', 'Box Model', 'Flex Model', 'Block Model'], 1),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson2_2.id,
      title: 'Quiz: CSS Flexbox',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Property apa untuk mengaktifkan Flexbox pada container?', ['display: block', 'display: flex', 'display: grid', 'display: inline'], 1),
        q('Property apa yang mengatur alignment pada sumbu utama (main axis)?', ['align-items', 'justify-content', 'flex-direction', 'align-self'], 1),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson2_3.id,
      title: 'Quiz: CSS Grid',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Property apa untuk mendefinisikan kolom pada CSS Grid?', ['grid-template-rows', 'grid-template-columns', 'grid-column', 'grid-area'], 1),
        q('Apa satuan khusus CSS Grid untuk porsi fleksibel?', ['px', 'em', 'fr', '%'], 2),
      ]),
    },
  });

  // Module 2 Quiz
  await prisma.quiz.create({
    data: {
      moduleId: mod2.id,
      title: 'Module Quiz: Styling dengan CSS',
      quizType: QuizType.MODULE,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa kepanjangan dari CSS?', ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'], 0),
        q('Selector CSS mana yang memilih elemen berdasarkan class?', ['#myClass', '.myClass', 'myClass', '*myClass'], 1),
        q('Property apa untuk membuat sudut elemen melengkung?', ['border-style', 'border-radius', 'border-curve', 'corner-radius'], 1),
        q('Apa perbedaan utama Flexbox dan Grid?', ['Flexbox 2D, Grid 1D', 'Flexbox 1D, Grid 2D', 'Tidak ada perbedaan', 'Flexbox lebih baru'], 1),
        q('Property apa untuk menambahkan bayangan pada elemen?', ['text-shadow', 'box-shadow', 'element-shadow', 'drop-shadow'], 1),
      ]),
    },
  });

  // ── MODULE 3: Dasar JavaScript ─────────────────────────────
  const mod3 = await prisma.module.create({
    data: {
      courseId: courseWebProg.id,
      title: 'Dasar JavaScript',
      description: 'Pelajari bahasa pemrograman JavaScript untuk membuat web interaktif.',
      orderIndex: 3,
    },
  });

  const lesson3_1 = await prisma.lesson.create({
    data: {
      moduleId: mod3.id,
      title: 'JavaScript Crash Course for Beginners',
      description: 'Variabel, tipe data, operator, kondisional, loop, dan fungsi dasar.',
      youtubeUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c',
      duration: '100 min',
      orderIndex: 1,
    },
  });

  const lesson3_2 = await prisma.lesson.create({
    data: {
      moduleId: mod3.id,
      title: 'DOM Manipulation & Events',
      description: 'Manipulasi elemen HTML dengan JavaScript dan menangani event user.',
      youtubeUrl: 'https://www.youtube.com/embed/5fb2aPlgoys',
      duration: '45 min',
      orderIndex: 2,
    },
  });

  const lesson3_3 = await prisma.lesson.create({
    data: {
      moduleId: mod3.id,
      title: 'ES6+ Modern JavaScript Features',
      description: 'Arrow functions, destructuring, spread operator, template literals, dan modules.',
      youtubeUrl: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
      duration: '35 min',
      orderIndex: 3,
    },
  });

  // In-lesson quizzes for Module 3
  await prisma.quiz.create({
    data: {
      lessonId: lesson3_1.id,
      title: 'Quiz: JS Basics',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Keyword apa yang digunakan untuk mendeklarasikan variabel yang bisa diubah nilainya?', ['const', 'let', 'var', 'let dan var'], 3),
        q('Apa output dari: typeof "Hello"?', ['number', 'boolean', 'string', 'object'], 2),
        q('Operator apa yang membandingkan nilai DAN tipe data?', ['==', '===', '!=', '>'], 1),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson3_2.id,
      title: 'Quiz: DOM Manipulation',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Method apa untuk memilih elemen berdasarkan ID?', ['querySelector', 'getElementById', 'getElement', 'findById'], 1),
        q('Event apa yang terjadi saat user mengklik elemen?', ['hover', 'click', 'submit', 'load'], 1),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson3_3.id,
      title: 'Quiz: ES6+ Features',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa sintaks arrow function yang benar?', ['function() =>', '() => {}', '=> function()', 'function =>'], 1),
        q('Template literal menggunakan karakter apa?', ['Single quotes \'\'', 'Double quotes ""', 'Backticks ``', 'Pipe ||'], 2),
      ]),
    },
  });

  // Module 3 Quiz
  await prisma.quiz.create({
    data: {
      moduleId: mod3.id,
      title: 'Module Quiz: Dasar JavaScript',
      quizType: QuizType.MODULE,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa output dari: console.log(2 + "2")?', ['4', '22', 'NaN', 'Error'], 1),
        q('Method array apa untuk menambah elemen di akhir?', ['unshift()', 'push()', 'append()', 'add()'], 1),
        q('Apa itu callback function?', ['Fungsi yang mengembalikan nilai', 'Fungsi yang dipanggil di dalam fungsi lain', 'Fungsi rekursif', 'Fungsi tanpa parameter'], 1),
        q('Keyword apa untuk menangani error di JavaScript?', ['catch', 'error', 'try...catch', 'handle'], 2),
        q('Apa perbedaan let dan const?', ['Tidak ada perbedaan', 'let bisa diubah, const tidak', 'const bisa diubah, let tidak', 'Keduanya tidak bisa diubah'], 1),
      ]),
    },
  });

  // ── MODULE 4: Project Website Pertamamu ────────────────────
  const mod4 = await prisma.module.create({
    data: {
      courseId: courseWebProg.id,
      title: 'Project: Website Pertamamu',
      description: 'Praktik membangun website lengkap dari awal dan deploy ke internet.',
      orderIndex: 4,
    },
  });

  const lesson4_1 = await prisma.lesson.create({
    data: {
      moduleId: mod4.id,
      title: 'Build a Responsive Website from Scratch',
      description: 'Praktik membangun website portfolio dengan HTML, CSS, dan JavaScript.',
      youtubeUrl: 'https://www.youtube.com/embed/p0bGHP-PXD4',
      duration: '50 min',
      orderIndex: 1,
    },
  });

  const lesson4_2 = await prisma.lesson.create({
    data: {
      moduleId: mod4.id,
      title: 'Responsive Web Design Tutorial',
      description: 'Media queries, mobile-first design, dan layout responsif.',
      youtubeUrl: 'https://www.youtube.com/embed/srvUrASNj0s',
      duration: '40 min',
      orderIndex: 2,
    },
  });

  const lesson4_3 = await prisma.lesson.create({
    data: {
      moduleId: mod4.id,
      title: 'Deploy Website ke Internet (Netlify)',
      description: 'Cara deploy website gratis ke Netlify dan mendapatkan URL live.',
      youtubeUrl: 'https://www.youtube.com/embed/4h8B080Mv4U',
      duration: '15 min',
      orderIndex: 3,
    },
  });

  // In-lesson quizzes for Module 4
  await prisma.quiz.create({
    data: {
      lessonId: lesson4_1.id,
      title: 'Quiz: Building a Website',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('File apa yang pertama kali dibuka browser saat mengakses website?', ['style.css', 'app.js', 'index.html', 'main.js'], 2),
        q('Tag apa untuk menghubungkan file CSS ke HTML?', ['<style>', '<css>', '<link>', '<script>'], 2),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson4_2.id,
      title: 'Quiz: Responsive Design',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa fitur CSS yang digunakan untuk responsive design?', ['@import', '@media', '@responsive', '@screen'], 1),
        q('Apa pendekatan mobile-first?', ['Desain desktop dulu', 'Desain untuk mobile dulu, lalu scale up', 'Hanya untuk mobile', 'Tidak mendukung desktop'], 1),
      ]),
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson4_3.id,
      title: 'Quiz: Deployment',
      quizType: QuizType.IN_LESSON,
      passingScore: 80,
      questions: JSON.stringify([
        q('Platform apa yang bisa digunakan untuk deploy website statis gratis?', ['AWS EC2', 'Netlify', 'Oracle Cloud', 'IBM Watson'], 1),
        q('Apa yang dimaksud dengan deployment?', ['Menulis kode', 'Menguji kode', 'Mempublikasikan website agar bisa diakses online', 'Mendesain UI'], 2),
      ]),
    },
  });

  // Module 4 Quiz
  await prisma.quiz.create({
    data: {
      moduleId: mod4.id,
      title: 'Module Quiz: Project Website Pertamamu',
      quizType: QuizType.MODULE,
      passingScore: 80,
      questions: JSON.stringify([
        q('Apa urutan yang benar dalam membuat website?', ['CSS → HTML → JS', 'JS → CSS → HTML', 'HTML → CSS → JS', 'Tidak ada urutan'], 2),
        q('Meta tag viewport penting untuk apa?', ['SEO', 'Responsive design di mobile', 'Loading speed', 'Security'], 1),
        q('Apa itu Git?', ['Text editor', 'Framework CSS', 'Version control system', 'Bahasa pemrograman'], 2),
        q('CDN kepanjangannya adalah?', ['Code Delivery Network', 'Content Delivery Network', 'Cloud Data Network', 'Central Database Node'], 1),
        q('File apa yang WAJIB ada di root project untuk deploy ke Netlify?', ['package.json', 'index.html', 'server.js', 'netlify.config'], 1),
      ]),
    },
  });

  console.log('✅ Modules, Lessons, and Quizzes for "Elementary Web Programming" created.');

  // ── Enrollments ────────────────────────────────────────────
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

  console.log('✅ Enrollments created.');

  // ── Certificates ───────────────────────────────────────────
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

  console.log('✅ Certificates created.');

  // ── Community Posts ────────────────────────────────────────
  await prisma.communityPost.create({
    data: {
      authorId: studentUser.id,
      authorName: 'Sarah Jenkins',
      authorRole: 'Student',
      channel: '#CareerAdvice',
      title: 'Preparing for UX Interviews',
      content:
        'Hey everyone! I have my first round interview for a Product Design role next week. What are some common whiteboard challenges they might throw at me?',
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
        'Just uploaded the new module on Advanced React Patterns. We dive deep into Custom Hooks and Context API optimization.',
      likesCount: 52,
      commentsCount: 19,
    },
  });

  console.log('✅ Community posts created.');

  // ── Calendar Events ────────────────────────────────────────
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

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
