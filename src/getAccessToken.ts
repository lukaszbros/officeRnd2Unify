import { HttpService } from '@nestjs/axios';
import qs from 'qs';
import { firstValueFrom } from 'rxjs';

export async function getAccessToken(http: HttpService): Promise<string> {
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
    http.post<{ access_token: string }>(url, qs.stringify(data), {
      headers,
    }),
  );

  return response.data.access_token;
}
