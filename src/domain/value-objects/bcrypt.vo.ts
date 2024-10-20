import * as bcrypt from 'bcrypt';

export class Bcrypt {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static async create(rawPassword: string): Promise<Bcrypt> {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    return new Bcrypt(hashedPassword);
  }

  async compare(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.value);
  }

  toPrimitives(): string {
    return this.value;
  }
}
