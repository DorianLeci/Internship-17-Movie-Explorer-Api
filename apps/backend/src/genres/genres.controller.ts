import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GenreEntity } from './entities/genre.entity';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOkResponse({
    description: 'All genres fetched and ordered by genre name',
    isArray: true,
    type: GenreEntity,
  })
  findAll() {
    return this.genresService.findAll();
  }
}
