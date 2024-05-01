import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DRIZZLE_ORM } from '@app/core/constants/db.constants';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/modules/drizzle/schema';

describe('AuthService', () => {
  let service: AuthService;
  let postgresJsDatabaseMock = {} as PostgresJsDatabase<typeof schema>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
