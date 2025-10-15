import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as qs from 'qs';
import { OfficeRNDAuth } from './interfaces';

@Injectable()
export class OfficerndAuthService {
  private readonly logger = new Logger(OfficerndAuthService.name);

  private accessToken: string | null = null;
  private expiresAt: number | null = null; // timestamp in ms

  constructor(private readonly http: HttpService) {}

  private async fetchNewToken() {
    const url = 'https://identity.officernd.com/oauth/token';

    const data = {
      client_secret: 'iiUT7kr0OxXEAN0Qlz9FKBJkvpRDe9e5',
      client_id: '7WCHj7WOpiZUKKpe',
      grant_type: 'client_credentials',
      scope:
        'flex.community.members.read flex.community.companies.read flex.community.memberships.read flex.space.resources.read flex.space.bookings.read',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await firstValueFrom(
      this.http.post<OfficeRNDAuth>(url, qs.stringify(data), { headers }),
    );

    const { access_token, expires_in } = response.data;

    this.accessToken = access_token;
    this.expiresAt = Date.now() + expires_in * 1000 - 60_000; // refresh 1 min before expiry

    this.logger.log(`New Officernd token fetched, expires in ${expires_in}s`);
  }

  async getToken(): Promise<string> {
    // If token missing or expired, fetch a new one
    if (!this.accessToken || !this.expiresAt || Date.now() >= this.expiresAt) {
      await this.fetchNewToken();
    }
    return this.accessToken!;
  }

  async get<T = any>(url: string) {
    const token = await this.getToken();

    const response = await firstValueFrom(
      this.http.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    return response.data as T;
  }
}
