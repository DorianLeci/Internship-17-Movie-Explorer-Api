import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieEntity } from './entities/movie_entity';
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
}
