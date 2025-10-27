-- AlterTable
ALTER TABLE "public"."MiniBusStop" ADD COLUMN     "routeId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Route" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DriverAssignment" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "DriverAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DriverAssignment_driverId_idx" ON "public"."DriverAssignment"("driverId");

-- CreateIndex
CREATE INDEX "DriverAssignment_routeId_idx" ON "public"."DriverAssignment"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverAssignment_driverId_active_key" ON "public"."DriverAssignment"("driverId", "active");

-- AddForeignKey
ALTER TABLE "public"."MiniBusStop" ADD CONSTRAINT "MiniBusStop_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DriverAssignment" ADD CONSTRAINT "DriverAssignment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."Drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DriverAssignment" ADD CONSTRAINT "DriverAssignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
