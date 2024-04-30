import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
