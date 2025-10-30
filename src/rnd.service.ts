import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { OfficerndAuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import {
  RndUser,
  RndListResponse,
  RndMembership,
  RndPlan,
} from './interfacesRnd';

@Injectable()
export class RndService {
  private readonly logger = new Logger(RndService.name);
  private API_PATH =
    'https://app.officernd.com/api/v2/organizations/yolkkrakow';

  constructor(
    private readonly http: HttpService,
    private readonly officerndAuthService: OfficerndAuthService,
  ) {
    this.logger.log('Scheduler started');
  }

  async onModuleInit() {
    await this.officerndAuthService.getToken();
  }

  async getChangedUser(lastCall: Date) {
    this.logger.log('Get changed users');
    const token = await this.officerndAuthService.getToken();
    try {
      const response = await lastValueFrom(
        this.http.get<RndListResponse<RndUser>>(
          `${this.API_PATH}/members?modifiedAt[$gte]=${lastCall.toISOString()}`,
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
      return response.data.results;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }

  async getUserMemberships(memberId: string) {
    this.logger.log(`Get member ${memberId} membership`);
    const token = await this.officerndAuthService.getToken();
    try {
      const response = await lastValueFrom(
        this.http.get<RndListResponse<RndMembership>>(
          `${this.API_PATH}/memberships?member=${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }

  async getPlan(planId: string) {
    this.logger.log(`Get plan ${planId}`);
    const token = await this.officerndAuthService.getToken();
    try {
      const response = await lastValueFrom(
        this.http.get<RndPlan>(`${this.API_PATH}/plans/${planId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }
}
