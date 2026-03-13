import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GenreEntity[]> {
    return this.prisma.genre.findMany();
  }
}
