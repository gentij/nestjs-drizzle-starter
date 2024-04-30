import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE_ORM } from '@app/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import { BadRequestException } from '@app/core/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.conn.query.users.findFirst({
      where: eq(schema.users.email, createUserDto.email),
    });

    if (existingUser)
      return new BadRequestException({ message: 'Email is already in use' });

    const user = await this.conn
      .insert(schema.users)
      .values(createUserDto)
      .returning();

    return user;
  }

  async findAll() {
    return await this.conn.query.users.findMany();
  }

  async findOne(id: number) {
    return await this.conn.query.users.findFirst({
      where: eq(schema.users.id, id),
      with: {
        role: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
