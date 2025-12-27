/*
  Warnings:

  - You are about to drop the `Routes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Drivers" DROP CONSTRAINT "Drivers_current_route_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."RouteStops" DROP CONSTRAINT "RouteStops_route_id_fkey";

-- DropTable
DROP TABLE "public"."Routes";

-- CreateTable
CREATE TABLE "public"."Route" (
    "id" SERIAL NOT NULL,
    "route_name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Drivers" ADD CONSTRAINT "Drivers_current_route_id_fkey" FOREIGN KEY ("current_route_id") REFERENCES "public"."Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteStops" ADD CONSTRAINT "RouteStops_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
