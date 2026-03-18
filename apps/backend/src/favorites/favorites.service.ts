import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './entities/favorite_entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFavoriteDto): Promise<FavoriteEntity> {
    const existing = await this.prisma.favorite.findUnique({
      where: { movieId_userId: { userId: dto.movieId, movieId: dto.userId } },
    });

    if (existing)
      throw new ConflictException('Film is already in the favorites');

    return this.prisma.favorite.create({
      data: { movieId: dto.movieId, userId: dto.userId },
    });
  }

  async remove(movieId: number, userId: number) {
    const existing = await this.prisma.favorite.findUnique({
      where: { movieId_userId: { movieId: movieId, userId: userId } },
    });

    if (!existing) throw new NotFoundException('Film is not in the favorites');

    await this.prisma.favorite.delete({
      where: { movieId_userId: { movieId: movieId, userId: userId } },
    });
  }

  async findAllByUser();
}
