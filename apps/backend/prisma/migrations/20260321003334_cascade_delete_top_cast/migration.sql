-- DropForeignKey
ALTER TABLE "TopCast" DROP CONSTRAINT "TopCast_movieId_fkey";

-- AddForeignKey
ALTER TABLE "TopCast" ADD CONSTRAINT "TopCast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
