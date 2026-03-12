import SortOrder from '@enums/SortOrder';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { FindMoviesDto } from './dto/find-movies.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findMovies(query: FindMoviesDto) {
    const where: any = {};
    if (query.search)
      where.title = { contains: query.search, mode: 'insensitive' };

    if (query.genre) where.genres = { some: { name: query.genre } };

    const orderBy = query.sortBy
      ? { [query.sortBy]: query.sortOrder || SortOrder.DESC }
      : { popularity: SortOrder.DESC };

    return this.prisma.movie.findMany({
      where,
      orderBy,
      include: {
        favorite: true,
      },
    });
  }
}
