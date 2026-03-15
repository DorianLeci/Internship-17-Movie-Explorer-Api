import SortOrder from '@enums/SortOrder';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieDetailsEntity } from './entities/movie_details.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMovies(query: FindMoviesDto): Promise<MovieEntity[]> {
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

  async findFavoriteMovies(): Promise<MovieEntity[]> {
    return this.prisma.movie.findMany({
      where: { favorite: { isNot: null } },
      include: { favorite: true },
      orderBy: {
        favorite: {
          createdAt: SortOrder.DESC,
        },
      },
    });
  }

  async findMovieById(id: number): Promise<MovieDetailsEntity> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        favorite: true,
        genres: true,
        topCast: true,
        topCrew: true,
        reviews: true,
      },
    });

    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);

    movie.topCrew.sort((a, b) => a.role.localeCompare(b.role));

    return movie;
  }
}
