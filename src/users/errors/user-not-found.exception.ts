import { HttpException, HttpStatus } from '@nestjs/common';

type Prop = string;

export class UserNotFoundException extends HttpException {
  constructor(private readonly prop: Prop) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: 'USER_NOT_FOUND',
        message: `User with ${prop} Not Found`,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
