import { OptionalTokenGuard } from '@guards/optional-token.gaurd';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthRoles } from '@roles/auth-roles.decorator';
import { Role } from 'generated/prisma/client';
import { FindMoviesDto } from './dto/find-movies.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieDetailsEntity } from './entities/movie_details.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(OptionalTokenGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'All movies fetched by query parameters',
    isArray: true,
    type: MovieEntity,
  })
  findAll(@Query() query: FindMoviesDto, @Req() req) {
    const userId = req.user?.sub;
    return this.moviesService.findMovies(query, userId);
  }

  @UseGuards(OptionalTokenGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Movie fetched by id',
    type: MovieDetailsEntity,
  })
  @ApiNotFoundResponse({ description: 'Movie by specified id not found' })
  async getMovieById(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user?.sub;
    return this.moviesService.findMovieById(id, userId);
  }

  @AuthRoles(Role.ADMIN, Role.USER)
  @Get('favorites')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'ALl user favorite movies fetched',
    type: MovieEntity,
  })
  async getFavorites(@Req() req) {
    const userId = req.user.sub;
    return this.moviesService.findFavorites(userId);
  }
}
