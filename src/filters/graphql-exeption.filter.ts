import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';

@Catch(HttpException)
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const response = exception.getResponse();
    const statusCode = exception.getStatus();

    const message =
      typeof response === 'object' && response !== null
        ? (response as any).message || exception.message
        : exception.message;

    throw new ApolloError(message, exception.name, { statusCode });
  }
}
