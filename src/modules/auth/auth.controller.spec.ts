/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/modules/drizzle/schema';
import { DRIZZLE_ORM } from '@app/core/constants/db.constants';
import {
  accessTokenMock,
  registerBodyMock,
  signInBodyMock,
  userMock,
} from 'test/mocks';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@app/core/exceptions';
import { ERROR_MESSAGES } from '@app/core/constants/errorMessages.constants';

describe('AuthController', () => {
  let controller: AuthController;
  let postgresJsDatabaseMock = {} as PostgresJsDatabase<typeof schema>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: DRIZZLE_ORM,
          useValue: postgresJsDatabaseMock,
        },
        UsersService,
        AuthService,
        JwtService,
      ],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register with correct payload', () => {
    it('should return registered user', async () => {
      jest
        .spyOn(controller, 'register')
        .mockImplementation(async () => userMock);

      expect(await controller.register(registerBodyMock)).toBe(userMock);
    });
  });

  describe('register with existing email', () => {
    it('should return bad request exception error', async () => {
      let error = new BadRequestException({
        message: ERROR_MESSAGES.EMAIL_TAKEN,
      });
      jest.spyOn(controller, 'register').mockImplementation(async () => error);

      expect(await controller.register(registerBodyMock)).toBe(error);
    });
  });

  describe('sign with correct payload', () => {
    it('should return access token', async () => {
      jest
        .spyOn(controller, 'signIn')
        .mockImplementation(async () => ({ access_token: accessTokenMock }));

      expect(await controller.signIn(signInBodyMock)).toStrictEqual({
        access_token: accessTokenMock,
      });
    });
  });

  describe('sign in with non existing email', () => {
    it('should return bad request exception error', async () => {
      let error = new BadRequestException({
        message: ERROR_MESSAGES.USER_EMAIL_NOT_FOUND,
      });
      jest.spyOn(controller, 'signIn').mockImplementation(async () => error);

      expect(await controller.signIn(signInBodyMock)).toBe(error);
    });
  });
});
