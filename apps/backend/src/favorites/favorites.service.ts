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
      where: { userId_movieId: dto.movieId },
    });

    if (existing)
      throw new ConflictException('Film is already in the favorites');

    return this.prisma.favorite.create({
      data: { movieId: dto.movieId },
    });
  }

  async remove(movieId: number) {
    const existing = await this.prisma.favorite.findUnique({
      where: { movieId: movieId },
    });

    if (!existing) throw new NotFoundException('Film is not in the favorites');

    await this.prisma.favorite.delete({
      where: { movieId: movieId },
    });
  }
}
