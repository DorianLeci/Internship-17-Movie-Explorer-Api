import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Role } from 'generated/prisma/client';
import { AuthRoles } from 'src/roles/auth-roles.decorator';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieDetailsEntity } from './entities/movie_details.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @AuthRoles(Role.ADMIN, Role.USER)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'All movies fetched by query parameters',
    isArray: true,
    type: MovieEntity,
  })
  findAll(@Query() query: FindMoviesDto) {
    return this.moviesService.findMovies(query);
  }

  @AuthRoles(Role.ADMIN, Role.USER)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Movie fetched by id',
    type: MovieDetailsEntity,
  })
  @ApiNotFoundResponse({ description: 'Movie by specified id not found' })
  async getMovieById(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findMovieById(id);
  }
}
