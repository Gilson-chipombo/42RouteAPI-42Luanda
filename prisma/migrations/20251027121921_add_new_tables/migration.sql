/*
  Warnings:

  - You are about to drop the column `routeId` on the `MiniBusStop` table. All the data in the column will be lost.
  - You are about to drop the `DriverAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DriverAssignment" DROP CONSTRAINT "DriverAssignment_driverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DriverAssignment" DROP CONSTRAINT "DriverAssignment_routeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MiniBusStop" DROP CONSTRAINT "MiniBusStop_routeId_fkey";

-- AlterTable
ALTER TABLE "public"."Drivers" ADD COLUMN     "current_route_id" INTEGER;

-- AlterTable
ALTER TABLE "public"."MiniBusStop" DROP COLUMN "routeId";

-- DropTable
DROP TABLE "public"."DriverAssignment";

-- DropTable
DROP TABLE "public"."Route";

-- CreateTable
CREATE TABLE "public"."Routes" (
    "id" SERIAL NOT NULL,
    "route_name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RouteStops" (
    "id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "stop_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "RouteStops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteStops_route_id_stop_id_key" ON "public"."RouteStops"("route_id", "stop_id");

-- AddForeignKey
ALTER TABLE "public"."Drivers" ADD CONSTRAINT "Drivers_current_route_id_fkey" FOREIGN KEY ("current_route_id") REFERENCES "public"."Routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteStops" ADD CONSTRAINT "RouteStops_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."Routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteStops" ADD CONSTRAINT "RouteStops_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "public"."MiniBusStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
