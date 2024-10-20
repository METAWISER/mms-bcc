import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
      .send({ query })
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.users).toBeInstanceOf(Array);
  });

  it('/graphql (POST) - should create a user', async () => {
    const mutation = `
      mutation {
        createUser(createUserInput: { name: "Test User", email: "testuser@example.com", password: "password123" }) {
          _id
          name
          email
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation })
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.createUser).toHaveProperty('name', 'test user');
    expect(response.body.data.createUser).toHaveProperty(
      'email',
      'testuser@example.com',
    );

    createdUserId = response.body.data.createUser._id;
  });

  it('/graphql (POST) - should delete a user', async () => {
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
      .send({ query: mutation, variables })
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.deleteUser).toHaveProperty('name', 'test user');
    expect(response.body.data.deleteUser).toHaveProperty(
      'email',
      'testuser@example.com',
    );
  });
});
