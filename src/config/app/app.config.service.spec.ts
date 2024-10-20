import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                'app.env': 'test',
                'app.name': 'Test App',
                'app.url': 'http://localhost',
                'app.port': 3000,
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('envs should be defined', () => {
    expect(service).toBeDefined();
    expect(service.name).toBeDefined();
    expect(service.url).toBeDefined();
    expect(service.port).toBeDefined();
    expect(service.env).toBeDefined();
  });
});
