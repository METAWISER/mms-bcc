import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Bcrypt } from 'src/domain/value-objects/bcrypt.vo';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => String, { description: 'UUID' })
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Field(() => String, { description: 'user name' })
  @Prop({ required: true })
  name: string;

  @Field(() => String, { description: 'user email' })
  @Prop({ required: true, unique: true })
  email: string;

  @HideField()
  @Prop({ required: true })
  password: string;

  @Field(() => [String], { description: 'user roles' })
  @Prop({ type: [String], default: ['client'] })
  roles: string[];

  @Field(() => Date, { description: 'Creation date' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => Date, { description: 'Last update date' })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.isModified('name')) {
    user.name = user.name.trim().toLowerCase();
  }
  if (this.isModified('password')) {
    const hashedPassword = await Bcrypt.create(
      this.password.replace(/\s+/g, ''),
    );
    this.password = hashedPassword.toPrimitives();
  }
  next();
});
