import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OfficerndAuthService } from './auth.service';
import { RndResponse, RndContact } from './interfacesRnd';
import { UserService } from './user.service';

@Injectable()
export class ApiSchedulerService {
  INTERVAL = 60 * 1000;

  private readonly logger = new Logger(ApiSchedulerService.name);
  private lastCall = new Date().toISOString();
  private authToken: string | null = null;

  constructor(
    private readonly http: HttpService,
    private readonly officerndAuthService: OfficerndAuthService,
    private readonly userService: UserService,
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
    const callTime = new Date().toISOString();
    try {
      const response = await firstValueFrom(
        this.http.get<RndResponse<RndContact>>(
          `https://app.officernd.com/api/v2/organizations/yolkkrakow/members?modifiedAt[$gte]=${this.lastCall}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      this.logger.log(
        'API response:',
        JSON.stringify(response.data.results),
        response.data.results.length,
      );
      if (response.data.results.length > 0) {
        for (const user of response.data.results) {
          this.userService.processUser(user);
        }
      }

      this.lastCall = callTime;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }
}
