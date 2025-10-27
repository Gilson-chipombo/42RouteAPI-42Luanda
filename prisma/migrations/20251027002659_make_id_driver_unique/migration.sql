/*
  Warnings:

  - A unique constraint covering the columns `[id_driver]` on the table `DriverCoordinates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DriverCoordinates_id_driver_key" ON "public"."DriverCoordinates"("id_driver");
