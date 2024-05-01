import { Test } from '@nestjs/testing';
import { DRIZZLE_ORM } from '@app/core/constants/db.constants';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/modules/drizzle/schema';

describe('UserService', () => {
  let service: UsersService;
  let postgresJsDatabaseMock = {} as PostgresJsDatabase<typeof schema>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: DRIZZLE_ORM,
          useValue: postgresJsDatabaseMock,
        },
        UsersService,
        UsersService,
        JwtService,
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
