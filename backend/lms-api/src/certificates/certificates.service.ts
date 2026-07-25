import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async getUserCertificates(userId?: string) {
    const targetUserId = userId || (await this.getStudentId());

    return this.prisma.certificate.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async getStudentId(): Promise<string> {
    const user = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    return user?.id || '';
  }
}
