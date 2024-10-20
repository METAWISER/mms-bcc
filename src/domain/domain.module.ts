import { Module } from '@nestjs/common';
import { Bcrypt } from './value-objects/bcrypt.vo';

@Module({
  providers: [Bcrypt],
  exports: [Bcrypt],
})
export class DomainModule {}
