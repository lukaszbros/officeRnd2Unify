import { Controller, Get, Post, Req } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    /*
call to webhook api
this.httpService 
      .post('https://webhook.site/a13b5452-5f37-485b-be82-92b84a1c30ab', data) 
      .subscribe({ 
        complete: () => { 
          console.log('completed'); 
        }, 
        error: (err) => { 
          // you can handle error requests here 
        }, 
      }); 
  */

    return this.appService.getHello();
  }

  @Post()
  webhook(@Req() req: RawBodyRequest<Request>) {
    const rawBody = req.rawBody;
    console.log(rawBody);
  }
}
