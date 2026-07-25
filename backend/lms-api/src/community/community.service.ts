import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async findAllPosts(channel?: string) {
    const where: any = {};
    if (channel) {
      where.channel = { equals: channel, mode: 'insensitive' };
    }

    return this.prisma.communityPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPost(title: string, content: string, channel?: string, userId?: string) {
    const student = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });

    return this.prisma.communityPost.create({
      data: {
        authorId: userId || student?.id || '',
        authorName: student?.name || 'Farel Evan',
        authorRole: 'Student',
        channel: channel || '#General',
        title,
        content,
      },
    });
  }

  async likePost(id: string) {
    const post = await this.prisma.communityPost.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post tidak ditemukan');
    }

    return this.prisma.communityPost.update({
      where: { id },
      data: { likesCount: post.likesCount + 1 },
    });
  }
}
