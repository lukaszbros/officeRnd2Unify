import { Injectable, Logger } from '@nestjs/common';
import { UnifyService } from './unify.service';
import { RndUser } from './interfacesRnd';
import { RndService } from './rnd.service';
import fs from 'fs';
import path from 'path';
import { IMemembershipMap } from './interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private membershipMap: IMemembershipMap[] = [];

  constructor(
    private readonly rndService: RndService,
    private readonly unifyService: UnifyService,
  ) {
    this.logger.log('User service started');
  }
  onModuleInit() {
    this.logger.log('Initialising');
    this.loadMembrshiopMap();
  }

  loadMembrshiopMap() {
    const mapPath = path.join(process.cwd(), 'membership_map.json');
    try {
      const raw = fs.readFileSync(mapPath, 'utf8');
      this.membershipMap = JSON.parse(raw) as IMemembershipMap[];
      this.logger.log(`Loaded membership_map.json from ${mapPath}`);
    } catch (err) {
      this.logger.error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to load membership_map.json: ${err?.message ?? err}`,
      );
    }
  }

  async processUser(user: RndUser) {
    this.logger.log('Procerss user');
    const parts = user.name.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');

    let uuser = await this.unifyService.getUserByEmail(user.email);
    if (uuser) {
      this.logger.log('User exists');
    } else {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        user_email: user.email,
      };
      uuser = await this.unifyService.createUser(newUser);
    }

    this.logger.log('Check membership');
    const rndMemberships = await this.rndService.getUserMemberships(user._id);
    const rndPlans = Array.from(new Set(rndMemberships?.map((m) => m.plan)));
    const mappedPlans = rndPlans
      .flatMap((plan) => this.membershipMap.filter((m) => m.rndId === plan))
      .filter((p) => p !== null);

    this.logger.log(`Mapped plans ${JSON.stringify(mappedPlans, null, 2)}`);

    const mappedUPlanIds = mappedPlans.map((p) => p.uid);
    this.logger.log('Update plans');
    this.logger.log(`RND: ${JSON.stringify(mappedUPlanIds, null, 2)}`);
    this.logger.log(
      `Unify: ${JSON.stringify(uuser?.access_policy_ids, null, 2)}`,
    );

    console.log(uuser, mappedUPlanIds, mappedUPlanIds.length > 0);

    if (
      uuser &&
      mappedUPlanIds &&
      mappedUPlanIds.length > 0 &&
      JSON.stringify(mappedUPlanIds) !== JSON.stringify(uuser.access_policy_ids)
    ) {
      await this.unifyService.assignUserAccessPolicy(uuser?.id, mappedUPlanIds);
    } else {
      this.logger.log('Plans are the same no update needed');
    }

    this.logger.log('User processed');
  }
}
