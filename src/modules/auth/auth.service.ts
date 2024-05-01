import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Public } from '@app/core/decorators/auth/IsPublic';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async signIn({
    email,
    password,
  }: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
