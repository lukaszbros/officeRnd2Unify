import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import https from 'https';
import { lastValueFrom } from 'rxjs';
import { UCreateUser, UResponse, UUser } from './interfacesU';

@Injectable()
export class UnifyService {
  private unifyApiPath = 'https://192.168.1.190:12445/api/v1/developer';
  private queryConfig = {
    headers: {
      Authorization: 'Bearer +XcfKDKadTzPpAUB+M20NA',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };
  private readonly logger = new Logger(UnifyService.name);
  private users: UUser[] = [];

  constructor(private readonly http: HttpService) {
    this.logger.log('Unify started');
  }

  async onModuleInit() {
    await this.getUsers();
    //await this.fetchAccessPolicy();
  }

  async getUsers() {
    this.logger.log('loading current users');
    try {
      const response = await lastValueFrom(
        this.http.get<UResponse<UUser>>(
          `${this.unifyApiPath}/users?age_num=1&page_size=25`,
          this.queryConfig,
        ),
      );

      this.users = response.data.data;
      if (response.data.pagination.total === response.data.data.length) {
        this.logger.log(`Unify user loaded ${response.data.data.length}`);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }

  getUserByEmail(email: string) {
    return this.users.find((u) => u.user_email === email);
  }

  async createUser(user: UCreateUser) {
    try {
      const response = await lastValueFrom(
        this.http.post(`${this.unifyApiPath}/users`, user, this.queryConfig),
      );
      console.log('Response data:', response.data);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Error:', error.message);
    }
  }

  /*async fetchAccessPolicy() {
    ////api/v1/developer/access_policies
    this.logger.log('loading current users');
    try {
      const response = await lastValueFrom(
        this.http.get<UResponse<UUser>>(
          `${this.unifyApiPath}/access_policies?age_num=1&page_size=25`,
          this.queryConfig,
        ),
      );

      this.users = response.data.data;
      if (response.data.pagination.total === response.data.data.length) {
        this.logger.log(`Unify user loaded ${response.data}`);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }*/
}
