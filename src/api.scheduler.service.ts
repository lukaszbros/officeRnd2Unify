import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { UserService } from './user.service';
import { RndService } from './rnd.service';

@Injectable()
export class ApiSchedulerService {
  INTERVAL = 60 * 1000;

  private readonly logger = new Logger(ApiSchedulerService.name);
  private lastCall = new Date();

  constructor(
    private readonly rndService: RndService,
    private readonly userService: UserService,
  ) {
    this.logger.log('Scheduler started');
  }

  @Interval(60000)
  async callExternalApi() {
    this.logger.log('Get office rnd user changes');
    const callTime = new Date();
    try {
      const changedUsers = await this.rndService.getChangedUser(this.lastCall);

      if (changedUsers && changedUsers.length > 0) {
        for (const user of changedUsers) {
          await this.userService.processUser(user);
        }
      }

      this.lastCall = callTime;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('Failed to call API', error.message);
    }
  }
}
