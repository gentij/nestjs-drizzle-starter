import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE_ORM } from '@app/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/modules/drizzle/schema';
import { SQLWrapper, eq, or } from 'drizzle-orm';
import { BadRequestException } from '@app/core/exceptions';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@app/core/constants/auth.constants';

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

    const password = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);

    const user = await this.conn
      .insert(schema.users)
      .values({ ...createUserDto, role_id: 1, password })
      .returning();

    return user;
  }

  async findAll() {
    return await this.conn.query.users.findMany();
  }

  async findOne(options: Partial<typeof schema.users.$inferSelect>) {
    let whereCondition: { [key: string]: SQLWrapper } = {};

    for (const key in options) {
      if (key in schema.users) {
        whereCondition = {
          ...whereCondition,
          [key]: eq(schema.users[key], options[key]),
        };
      }
    }

    return await this.conn.query.users.findFirst({
      where: or(...Object.values(whereCondition)),
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
