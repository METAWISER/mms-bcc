import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;
  let jwtToken: string = 'anotheruser@example.com';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const mutation = `
      mutation {
        signup(signupInput: { name: "Admin User", email: "adminuser@example.com", password: "123456", roles: [ADMIN] }) {
          token
          user {
            _id
            name
            email
            roles
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    if (!response.body.data || !response.body.data.signup) {
      console.error('Error during signup:', response.body.errors);
      throw new Error('Failed to signup and obtain JWT token');
    }

    jwtToken = response.body.data.signup.token;
    createdUserId = response.body.data.signup.user._id;
  });

  afterAll(async () => {
    await app.close();
    const mongoose = await import('mongoose');
    await mongoose.disconnect();
  });

  it('/graphql (POST) - should return all users', async () => {
    const query = `
      query {
        users {
          _id
          name
          email
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query })
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.users).toBeInstanceOf(Array);
  });

  it('/graphql (POST) - should delete a user by ID', async () => {
    const mutation = `
      mutation DeleteUser($getUserArgs: GetUserArgs!) {
        deleteUser(getUserArgs: $getUserArgs) {
          _id
          name
          email
        }
      }
    `;

    const variables = {
      getUserArgs: {
        id: createdUserId,
      },
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: mutation, variables })
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.deleteUser).toHaveProperty('name', 'admin user');
    expect(response.body.data.deleteUser).toHaveProperty(
      'email',
      'adminuser@example.com',
    );
  });
});
