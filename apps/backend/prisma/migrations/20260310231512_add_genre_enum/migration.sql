/*
  Warnings:

  - Changed the type of `name` on the `Genre` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GenreEnum" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'CRIME', 'DOCUMENTARY', 'DRAMA', 'FAMILY', 'FANTASY', 'HISTORY', 'HORROR', 'MUSIC', 'MYSTERY', 'ROMANCE', 'SCI_FI', 'THRILLER', 'WAR', 'WESTERN');

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "name",
ADD COLUMN     "name" "GenreEnum" NOT NULL;
