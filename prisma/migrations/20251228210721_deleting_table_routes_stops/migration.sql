/*
  Warnings:

  - You are about to drop the `RouteStops` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `route_id` to the `MiniBusStop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."RouteStops" DROP CONSTRAINT "RouteStops_route_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."RouteStops" DROP CONSTRAINT "RouteStops_stop_id_fkey";

-- AlterTable
ALTER TABLE "public"."MiniBusStop" ADD COLUMN     "route_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."RouteStops";

-- AddForeignKey
ALTER TABLE "public"."MiniBusStop" ADD CONSTRAINT "MiniBusStop_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
