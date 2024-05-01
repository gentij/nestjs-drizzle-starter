import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import {
  AllExceptionsFilter,
  ValidationExceptionFilter,
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
} from './core/filters';
import { ConfigModule } from '@nestjs/config';
import { NestDrizzleModule } from './modules/drizzle/drizzle.module';
import * as schema from './modules/drizzle/schema';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/constants/auth.constants';
import { AuthGuard } from './core/guards/AuthGuard';
import { RolesGuard } from './core/guards/RoleGuard';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NestDrizzleModule.forRootAsync({
      useFactory: () => {
        return {
          driver: 'postgres-js',
          url: process.env.DATABASE_URL,
          options: { schema },
          migrationOptions: { migrationsFolder: './migration' },
        };
      },
    }),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    UsersService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
