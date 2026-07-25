import { Controller, Get, Post, Body, Param, Query, Request } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('posts')
  async findAllPosts(@Query('channel') channel?: string) {
    return this.communityService.findAllPosts(channel);
  }

  @Post('posts')
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('channel') channel: string,
    @Request() req: any,
  ) {
    const userId = req.user?.id;
    return this.communityService.createPost(title, content, channel, userId);
  }

  @Post('posts/:id/like')
  async likePost(@Param('id') id: string) {
    return this.communityService.likePost(id);
  }
}
