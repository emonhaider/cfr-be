import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getHealthStatus(): { status: string } {
    return { status: 'Healthy' };
  }
}
