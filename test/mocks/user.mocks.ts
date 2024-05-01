import { SignInDto } from '@app/modules/auth/dto/sign-in.dto';
import { CreateUserDto } from '@app/modules/users/dto/create-user.dto';
import * as schema from 'src/modules/drizzle/schema';

export const userMock: typeof schema.users.$inferSelect = {
  id: 0,
  email: 'test@mock.com',
  password: 'Test1234!',
  first_name: 'Test',
  last_name: 'Mock',
  username: 'testmock',
  role_id: 1,
};

export const accessTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYXV0aHVzZXIiLCJpYXQiOjE3MTQ1NTgyNzYsImV4cCI6MTcxNDY0NDY3Nn0.oGwdX0yrZy-u5itG9E2MR2YWp4bTJyrSHnzWw_DuqN8';

export const registerBodyMock: CreateUserDto = {
  email: userMock.email,
  password: userMock.password,
  first_name: userMock.first_name,
  last_name: userMock.last_name,
  username: userMock.username,
};

export const signInBodyMock: SignInDto = {
  email: userMock.email,
  password: userMock.password,
};
