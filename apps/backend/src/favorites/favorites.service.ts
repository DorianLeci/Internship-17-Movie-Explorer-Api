import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFavoriteDto) {
    const existing = await this.prisma.favorite.findUnique({
      where: { movieId: dto.movieId },
    });

    if (existing)
      throw new ConflictException('Film is already in the favorites');

    return this.prisma.favorite.create({
      data: { movieId: dto.movieId },
    });
  }
}
