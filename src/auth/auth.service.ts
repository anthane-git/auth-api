import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';

import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private dbSrv: DatabaseService,
    private jwtSrv: JwtService,
    private configSrv: ConfigService,
  ) {}

  async registerLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.dbSrv.user
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            throw new ForbiddenException('Credentials already taken');
          }
        }

        throw err;
      });

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async loginLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.dbSrv.user.findUnique({
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

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async refreshToken(userId: string, refreshTkn: string): Promise<Tokens> {
    const user = await this.dbSrv.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const refreshTknMatches = await argon.verify(user.hashedRt, refreshTkn);

    if (!refreshTknMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.dbSrv.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });

    return true;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.dbSrv.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async signToken(userId: string, email: string): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      email,
    };

    const [accessTkn, refreshTkn] = await Promise.all([
      this.jwtSrv.signAsync(payload, {
        expiresIn: '30m',
        secret: this.configSrv.get<string>('JWT_ACCESS_SECRET'),
      }),
      this.jwtSrv.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configSrv.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    return {
      access_token: accessTkn,
      refresh_token: refreshTkn,
    };
  }
}
