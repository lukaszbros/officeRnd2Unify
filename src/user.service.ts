import { Injectable, Logger } from '@nestjs/common';
import { UnifyService } from './unify.service';
import { RndContact } from './interfacesRnd';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly unifyService: UnifyService) {
    this.logger.log('User service started');
  }

  async processUser(user: RndContact) {
    this.logger.log('Procerss user', user);
    const parts = user.name.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');

    await this.unifyService.createUser({
      first_name: firstName,
      last_name: lastName,
      user_email: user.email,
    });

    this.logger.log('User processed');
  }
}
