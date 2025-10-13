import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OfficerndAuthService } from './auth.service';

@Injectable()
export class ApiSchedulerService {
  INTERVAL = 60 * 1000;

  private readonly logger = new Logger(ApiSchedulerService.name);

  private authToken: string | null = null;

  constructor(
    private readonly http: HttpService,
    private readonly officerndAuthService: OfficerndAuthService,
  ) {
    this.logger.log('Scheduler started');
  }

  async onModuleInit() {
    await this.officerndAuthService.getToken();
  }

  @Interval(60000)
  async callExternalApi() {
    this.logger.log('Api called');
    const token = await this.officerndAuthService.getToken();
    try {
      const response = await firstValueFrom(
        this.http.get(
          'https://app.officernd.com/api/v2/organizations/yolkkrakow/members',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      this.logger.log('API response:', JSON.stringify(response.data));
      // Do something with response.data here
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }
}
