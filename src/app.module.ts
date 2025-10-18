import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiSchedulerService } from './api.scheduler.service';
import { OfficerndAuthService } from './auth.service';
import { UnifyService } from './unify.service';
import { UserService } from './user.service';
import { RndService } from './rnd.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    ApiSchedulerService,
    OfficerndAuthService,
    RndService,
    UnifyService,
    UserService,
  ],
})
export class AppModule {}
