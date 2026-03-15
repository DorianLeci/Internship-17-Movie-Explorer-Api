/*
  Warnings:

  - You are about to drop the column `actorId` on the `TopCast` table. All the data in the column will be lost.
  - You are about to drop the column `crewMemberId` on the `TopCrew` table. All the data in the column will be lost.
  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CrewMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `TopCast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TopCrew` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TopCast" DROP CONSTRAINT "TopCast_actorId_fkey";

-- DropForeignKey
ALTER TABLE "TopCrew" DROP CONSTRAINT "TopCrew_crewMemberId_fkey";

-- AlterTable
ALTER TABLE "TopCast" DROP COLUMN "actorId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TopCrew" DROP COLUMN "crewMemberId",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Actor";

-- DropTable
DROP TABLE "CrewMember";
