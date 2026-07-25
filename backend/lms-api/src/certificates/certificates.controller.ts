import { Controller, Get, Request } from '@nestjs/common';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get('my-certificates')
  async getMyCertificates(@Request() req: any) {
    const userId = req.user?.id;
    return this.certificatesService.getUserCertificates(userId);
  }
}
