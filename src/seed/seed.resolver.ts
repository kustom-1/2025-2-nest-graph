import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/enums/roles.enum';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => String, { name: 'executeSeed' })
  @Auth(ValidRoles.admin)
  async executeSeed() {
    return this.seedService.runSeed();
  }
}
