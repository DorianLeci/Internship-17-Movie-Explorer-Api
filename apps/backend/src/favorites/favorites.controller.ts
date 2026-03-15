import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './entities/favorite_entity';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Movie successfully added to favorites',
    type: FavoriteEntity,
  })
  @ApiConflictResponse({
    description: 'Movie is already in favorites or invalid data',
  })
  async create(@Body() dto: CreateFavoriteDto) {
    return this.favoritesService.create(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Movie successfully removed from favorites',
  })
  @ApiNotFoundResponse({ description: 'Movie is not in favorites' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.remove(id);
  }
}
