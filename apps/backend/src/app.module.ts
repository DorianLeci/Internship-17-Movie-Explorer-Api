import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
