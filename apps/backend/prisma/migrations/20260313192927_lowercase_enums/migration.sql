/*
  Warnings:

  - The values [DIRECTOR,PRODUCER,WRITER,EDITOR,COMPOSER,CINEMATOGRAPHER] on the enum `CrewRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTION,ADVENTURE,ANIMATION,COMEDY,CRIME,DOCUMENTARY,DRAMA,FAMILY,FANTASY,HISTORY,HORROR,MUSIC,MYSTERY,ROMANCE,SCI_FI,THRILLER,WAR,WESTERN] on the enum `GenreEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CrewRole_new" AS ENUM ('Director', 'Producer', 'Writer', 'Editor', 'Composer', 'Cinematographer');
ALTER TABLE "TopCrew" ALTER COLUMN "role" TYPE "CrewRole_new" USING ("role"::text::"CrewRole_new");
ALTER TYPE "CrewRole" RENAME TO "CrewRole_old";
ALTER TYPE "CrewRole_new" RENAME TO "CrewRole";
DROP TYPE "public"."CrewRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GenreEnum_new" AS ENUM ('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western');
ALTER TABLE "Genre" ALTER COLUMN "name" TYPE "GenreEnum_new" USING ("name"::text::"GenreEnum_new");
ALTER TYPE "GenreEnum" RENAME TO "GenreEnum_old";
ALTER TYPE "GenreEnum_new" RENAME TO "GenreEnum";
DROP TYPE "public"."GenreEnum_old";
COMMIT;
