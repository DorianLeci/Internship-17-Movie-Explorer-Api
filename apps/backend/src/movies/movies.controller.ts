import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieDetailsEntity } from './entities/movie_details.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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
    description: 'Movie fetched by id',
    type: MovieDetailsEntity,
  })
  @ApiNotFoundResponse({ description: 'Movie by specified id not found' })
  async getMovieById(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findMovieById(id);
  }
}
