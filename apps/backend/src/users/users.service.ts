import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
