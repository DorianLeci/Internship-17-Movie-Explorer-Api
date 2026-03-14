import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [MoviesModule, PrismaModule, GenresModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
