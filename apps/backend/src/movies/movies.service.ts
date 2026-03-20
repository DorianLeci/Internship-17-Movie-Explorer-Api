import SortOrder from '@enums/SortOrder';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieDetailsEntity } from './entities/movie_details.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMovies(
    query: FindMoviesDto,
    userId?: number,
  ): Promise<MovieEntity[]> {
    const where: any = {};
    if (query.search)
      where.title = { contains: query.search, mode: 'insensitive' };

    if (query.genre) where.genres = { some: { name: query.genre } };

    const orderBy = query.sortBy
      ? { [query.sortBy]: query.sortOrder || SortOrder.DESC }
      : { popularity: SortOrder.DESC };

    const movies = await this.prisma.movie.findMany({
      where,
      orderBy,
      include: {
        favorites: userId ? { where: { userId } } : false,
      },
    });

    return movies.map((movie) => ({
      ...movie,
      isFavorite: userId ? movie.favorites?.length > 0 : undefined,
    }));
  }

  async findMovieById(
    movieId?: number,
    userId?: number,
  ): Promise<MovieDetailsEntity> {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
      include: {
        genres: true,
        topCast: true,
        topCrew: true,
        reviews: true,
        favorites: userId ? { where: { userId } } : false,
      },
    });

    if (!movie)
      throw new NotFoundException(`Movie with id ${movieId} not found`);

    movie.topCrew.sort((a, b) => a.role.localeCompare(b.role));

    return {
      ...movie,
      isFavorite: userId ? movie.favorites?.length > 0 : undefined,
    };
  }

  async findFavorites(userId: number): Promise<MovieEntity[]> {
    const movies = await this.prisma.movie.findMany({
      where: {
        favorites: { some: { userId } },
      },
      include: {
        favorites: { where: { userId } },
      },
    });

    return movies.map((movie) => ({
      ...movie,
      isFavorite: movie.favorites.length > 0,
    }));
  }

  async create(createMovieDto: CreateMovieDto) {
    console.log('Dto: ', createMovieDto);
    const movie = await this.prisma.movie.create({
      data: {
        title: createMovieDto.title,
        description: createMovieDto.description,
        runtime: createMovieDto.runtime,
        rating: createMovieDto.rating,
        popularity: createMovieDto.popularity,
        posterUrl: createMovieDto.posterUrl,
        trailerKey: createMovieDto.trailerKey,
        releaseDate: createMovieDto.releaseDate,

        genres: {
          connect: createMovieDto.genres.map((id) => ({ id })),
        },
      },
    });

    return movie.id;
  }
}
