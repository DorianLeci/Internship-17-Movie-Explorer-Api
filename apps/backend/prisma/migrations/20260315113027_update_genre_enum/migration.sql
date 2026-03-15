/*
  Warnings:

  - The values [Sci-Fi] on the enum `GenreEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GenreEnum_new" AS ENUM ('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western');
ALTER TABLE "Genre" ALTER COLUMN "name" TYPE "GenreEnum_new" USING ("name"::text::"GenreEnum_new");
ALTER TYPE "GenreEnum" RENAME TO "GenreEnum_old";
ALTER TYPE "GenreEnum_new" RENAME TO "GenreEnum";
DROP TYPE "public"."GenreEnum_old";
COMMIT;
