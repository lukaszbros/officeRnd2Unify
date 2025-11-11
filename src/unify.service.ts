import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import https from 'https';
import { lastValueFrom } from 'rxjs';
import { UAccessPolicy, UCreateUser, UResponse, UUser } from './interfacesU';
import minimist from 'minimist';

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
  private nounify = false;
  private sim = false;
  private users: UUser[] = [];
  private accessPolicies: UAccessPolicy[] = [];
  constructor(private readonly http: HttpService) {
    this.logger.log('Unify started');
  }

  async onModuleInit() {
    this.logger.log('Initialising');

    const args = minimist(process.argv.slice(2)) as Record<string, unknown>;

    this.sim = args['sim'] === true || args['sim'] === 'true' ? true : false;

    await this.getUsers();
    await this.fetchAccessPolicies();
  }

  async getUsers() {
    this.logger.log('Loading users');
    try {
      if (this.sim) {
        this.logger.log('Users loaded(sim) 0');
      } else {
        const response = await lastValueFrom(
          this.http.get<UResponse<UUser[]>>(
            `${this.unifyApiPath}/users?age_num=1&page_size=25`,
            this.queryConfig,
          ),
        );

        this.users = response.data.data;
        this.logger.log(`Users loaded ${response.data.data.length}`);
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
    this.logger.log('Create user');
    try {
      if (this.sim) {
        this.logger.log('User created (sim)', user);
      } else {
        const response = await lastValueFrom(
          this.http.post<UResponse<UUser>>(
            `${this.unifyApiPath}/users`,
            user,
            this.queryConfig,
          ),
        );
        console.log('User created:', response.data);
        return response.data.data;
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Error:', error.message);
    }
  }

  async fetchAccessPolicies() {
    this.logger.log('Loading access_policies');
    try {
      if (this.sim) {
        this.logger.log('Access_policies loaded (sim) 0');
      } else {
        const response = await lastValueFrom(
          this.http.get<UResponse<UAccessPolicy[]>>(
            `${this.unifyApiPath}/access_policies?page_num=1&page_size=25`,
            this.queryConfig,
          ),
        );

        this.accessPolicies = response.data.data;
        this.logger.log(`Access_policies loaded ${response.data.data.length}`);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }
}
