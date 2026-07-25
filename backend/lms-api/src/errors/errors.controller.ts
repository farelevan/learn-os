import {
  Controller,
  Get,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Controller('errors')
export class ErrorsController {
  @Get('400')
  trigger400() {
    throw new BadRequestException(
      'Format data atau parameter permintaan tidak valid (400 Bad Request)',
    );
  }

  @Get('403')
  trigger403() {
    throw new ForbiddenException(
      'Anda tidak memiliki akses ke sumber daya ini (403 Forbidden)',
    );
  }

  @Get('404')
  trigger404() {
    throw new NotFoundException(
      'Sumber daya atau endpoint tidak ditemukan (404 Not Found)',
    );
  }

  @Get('500')
  trigger500() {
    throw new InternalServerErrorException(
      'Terjadi kesalahan internal pada server backend (500 Internal Server Error)',
    );
  }
}
