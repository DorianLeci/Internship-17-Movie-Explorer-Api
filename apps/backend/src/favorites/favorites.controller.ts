import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthRoles } from '@roles/auth-roles.decorator';
import { Role } from 'generated/prisma/client';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './entities/favorite_entity';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @AuthRoles(Role.ADMIN, Role.USER)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Movie successfully added to favorites',
    type: FavoriteEntity,
  })
  @ApiConflictResponse({
    description: 'Movie is already in favorites',
  })
  @ApiForbiddenResponse({
    description:
      'Can not manipulate with your favorites without account and sufficient role',
  })
  async create(@Body() dto: CreateFavoriteDto, @Req() req) {
    const userId = req.user.sub;
    return this.favoritesService.create(dto, userId);
  }

  @AuthRoles(Role.ADMIN, Role.USER)
  @Delete(':movieId')
  @HttpCode(204)
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse({
    description: 'Movie successfully removed from favorites',
  })
  @ApiNotFoundResponse({ description: 'Movie is not in favorites' })
  @ApiForbiddenResponse({
    description:
      'Can not manipulate with your favorites without account and sufficient role',
  })
  async remove(@Param('movieId', ParseIntPipe) movieId: number, @Req() req) {
    const userId = req.user.sub;
    return this.favoritesService.remove(movieId, userId);
  }
}
