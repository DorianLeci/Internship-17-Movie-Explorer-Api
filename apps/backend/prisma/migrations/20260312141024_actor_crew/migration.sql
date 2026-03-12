/*
  Warnings:

  - You are about to drop the column `firstName` on the `TopCast` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `TopCast` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `TopCrew` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `TopCrew` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actorId` to the `TopCast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crewMemberId` to the `TopCrew` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CrewRole" ADD VALUE 'CINEMATOGRAPHER';

-- AlterTable
ALTER TABLE "TopCast" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "actorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TopCrew" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "crewMemberId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "TopCast" ADD CONSTRAINT "TopCast_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopCrew" ADD CONSTRAINT "TopCrew_crewMemberId_fkey" FOREIGN KEY ("crewMemberId") REFERENCES "CrewMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
