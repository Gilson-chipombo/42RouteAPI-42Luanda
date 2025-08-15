CREATE TABLE "public"."Admins" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "passwrd" TEXT,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Cadetes" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "city" TEXT,
    "distrit" TEXT,
    "passwrd" TEXT,
    "phone" INTEGER,
    "stop_id" INTEGER,

    CONSTRAINT "Cadetes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Drivers" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "passwrd" TEXT,
    "photo" TEXT,
    "phone" INTEGER,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."MiniBusStop" (
    "id" SERIAL NOT NULL,
    "stop_name" TEXT,
    "distrit" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "MiniBusStop_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Message" (
    "id" SERIAL NOT NULL,
    "id_driver" INTEGER NOT NULL,
    "id_cadete" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."DriverCoordinates" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "id_driver" INTEGER NOT NULL,

    CONSTRAINT "DriverCoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "public"."Admins"("username");
CREATE UNIQUE INDEX "Admins_email_key" ON "public"."Admins"("email");
CREATE UNIQUE INDEX "Cadetes_username_key" ON "public"."Cadetes"("username");
CREATE UNIQUE INDEX "Cadetes_email_key" ON "public"."Cadetes"("email");
CREATE UNIQUE INDEX "Drivers_username_key" ON "public"."Drivers"("username");
CREATE UNIQUE INDEX "Drivers_email_key" ON "public"."Drivers"("email");
CREATE UNIQUE INDEX "MiniBusStop_stop_name_key" ON "public"."MiniBusStop"("stop_name");

-- AddForeignKey
ALTER TABLE "public"."Cadetes" ADD CONSTRAINT "Cadetes_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "public"."MiniBusStop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_id_driver_fkey" FOREIGN KEY ("id_driver") REFERENCES "public"."Drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_id_cadete_fkey" FOREIGN KEY ("id_cadete") REFERENCES "public"."Cadetes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."DriverCoordinates" ADD CONSTRAINT "DriverCoordinates_id_driver_fkey" FOREIGN KEY ("id_driver") REFERENCES "public"."Drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
