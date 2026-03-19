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

  async create(
    { movieId }: CreateFavoriteDto,
    userId: number,
  ): Promise<FavoriteEntity> {
    const existing = await this.prisma.favorite.findUnique({
      where: { movieId_userId: { userId, movieId } },
    });

    if (existing)
      throw new ConflictException(
        `Movie (id: ${movieId}) is already in the favorites`,
      );

    return this.prisma.favorite.create({
      data: { movieId, userId },
    });
  }

  async remove(movieId: number, userId: number) {
    const existing = await this.prisma.favorite.findUnique({
      where: { movieId_userId: { movieId, userId } },
    });

    if (!existing)
      throw new NotFoundException(
        'Movie (id: ${movieId}) is not in the favorites',
      );

    await this.prisma.favorite.delete({
      where: { movieId_userId: { movieId, userId } },
    });
  }
}
