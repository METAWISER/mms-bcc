import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DomainModule,
  ],
  providers: [UserResolver, UsersService],
})
export class UserModule {}