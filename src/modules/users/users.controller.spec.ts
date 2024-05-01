/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/modules/drizzle/schema';
import { DRIZZLE_ORM } from '@app/core/constants/db.constants';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';

describe('UserController', () => {
  let controller: UsersController;
  let postgresJsDatabaseMock = {} as PostgresJsDatabase<typeof schema>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: DRIZZLE_ORM,
          useValue: postgresJsDatabaseMock,
        },
        UsersService,
        JwtService,
      ],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
