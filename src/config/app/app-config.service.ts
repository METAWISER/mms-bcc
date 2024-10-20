import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env', 'dev');
  }

  get name(): string {
    return this.configService.get<string>(
      'app.name',
      'MMS Order Management System',
    );
  }

  get url(): string {
    return this.configService.get<string>('app.url', 'localhost');
  }

  get port(): number {
    return +this.configService.get<number>('app.port', 3000);
  }
}
