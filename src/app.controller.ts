import { Controller, Get, Post, Req } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { MemoryLoggerService } from './memory.logger.service';

@Controller()
export class AppController {
  constructor(private readonly logger: MemoryLoggerService) {}

  @Get()
  logs(): string {
    return this.logger
      .getLogs()
      .map((log) => {
        const d = new Date(log.timestamp);
        const pad = (n: number) => n.toString().padStart(2, '0');
        const formatted = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
          d.getHours(),
        )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        return `[${log.level}] ${formatted}: ${log.message}`;
      })
      .join('<br/>');
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
  }

  @Post()
  webhook(@Req() req: RawBodyRequest<Request>) {
    const rawBody = req.rawBody;
    console.log(rawBody);
  }
}
