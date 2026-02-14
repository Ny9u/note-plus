import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHealth(): { status: string; service: string; timestamp: string; message: string } {
    return {
      status: 'ok',
      service: 'api',
      timestamp: new Date().toISOString(),
      message: 'API 服务正常运行',
    }
  }
}
