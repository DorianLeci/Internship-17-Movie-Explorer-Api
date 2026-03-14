import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieDetailsEntity } from './entities/movie_details_entity';
import { MovieEntity } from './entities/movie_entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('favorites')
  @ApiOkResponse({
    description: 'All favorite movies fetched',
    isArray: true,
    type: MovieEntity,
  })
  async getFavoriteMovies() {
    return this.moviesService.findFavoriteMovies();
  }

  @Get()
  @ApiOkResponse({
    description: 'All movies fetched by query parameters',
    isArray: true,
    type: MovieEntity,
  })
  findAll(@Query() query: FindMoviesDto) {
    return this.moviesService.findMovies(query);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'All movies fetched by query parameters',
    isArray: true,
    type: MovieDetailsEntity,
  })
  @ApiNotFoundResponse({ description: 'Movie by specified id not found' })
  async getMovieById(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findMovieById(id);
  }
}
