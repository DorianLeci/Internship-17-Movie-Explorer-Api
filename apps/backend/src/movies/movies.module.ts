import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [PrismaModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
