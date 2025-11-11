import { Injectable, Logger } from '@nestjs/common';
import { UnifyService } from './unify.service';
import { RndUser } from './interfacesRnd';
import { RndService } from './rnd.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly rndService: RndService,
    private readonly unifyService: UnifyService,
  ) {
    this.logger.log('User service started');
  }

  async processUser(user: RndUser) {
    this.logger.log('Procerss user');
    const parts = user.name.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');

    const existingUser = this.unifyService.getUserByEmail(user.email);
    if (existingUser) {
      this.logger.log('User exists');
    } else {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        user_email: user.email,
      };
      await this.unifyService.createUser(newUser);
    }

    this.logger.log('Check membership');
    const membershipsResponse = await this.rndService.getUserMemberships(
      user._id,
    );
    this.logger.log('Membership', membershipsResponse);

    this.logger.log('User processed');
  }
}
