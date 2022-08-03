import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';

import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private dbService: DatabaseService) {}

  async registerLocal(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }

      throw error;
    }
  }

  async loginLocal(dto: AuthDto) {
    const user = await this.dbService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials Incorect');
    }

    const isValidMatch = await argon.verify(user.hash, dto.password);

    if (!isValidMatch) {
      throw new ForbiddenException('Credentials Incorect');
    }

    return user;
  }

  refreshToken() {
    return 'refresh-token';
  }

  logout() {
    return 'logout';
  }
}
