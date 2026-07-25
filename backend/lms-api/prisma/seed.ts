import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Demo Student
  const student = await prisma.user.upsert({
    where: { email: 'student@learnos.com' },
    update: {},
    create: {
      name: 'Student Demo',
      email: 'student@learnos.com',
      password: hashedPassword,
      role: Role.STUDENT,
    },
  });

  // Demo Instructor
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@learnos.com' },
    update: {},
    create: {
      name: 'Dr. Jane Doe',
      email: 'instructor@learnos.com',
      password: hashedPassword,
      role: Role.INSTRUCTOR,
    },
  });

  // Demo Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnos.com' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@learnos.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Seeding berhasil! Akun demo telah dibuat:');
  console.log(' - Student:    student@learnos.com / password123');
  console.log(' - Instructor: instructor@learnos.com / password123');
  console.log(' - Admin:      admin@learnos.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Gagal Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
