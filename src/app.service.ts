import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //getToken https://identity.officernd.com/oauth/token
    return 'Hello World!';
  }
}
