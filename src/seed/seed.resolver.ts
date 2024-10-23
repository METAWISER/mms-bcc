import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, {
    name: 'executeSeed',
    description: 'Executes the build of the database',
  })
  async executeSeed(): Promise<boolean> {
    const result = await this.seedService.executeSeed();
    return result;
  }
}
