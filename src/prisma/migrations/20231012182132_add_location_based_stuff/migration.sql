-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userImage" TEXT,
    "countryId" TEXT NOT NULL,
    "banner" TEXT,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tradespot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT,
    "countryShortName" TEXT NOT NULL,

    CONSTRAINT "Tradespot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventAttendees" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Tradespot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_name_key" ON "Shop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_url_key" ON "Shop"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_EventAttendees_AB_unique" ON "_EventAttendees"("A", "B");

-- CreateIndex
CREATE INDEX "_EventAttendees_B_index" ON "_EventAttendees"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Tradespot_AB_unique" ON "_Tradespot"("A", "B");

-- CreateIndex
CREATE INDEX "_Tradespot_B_index" ON "_Tradespot"("B");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("shortName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tradespot" ADD CONSTRAINT "Tradespot_countryShortName_fkey" FOREIGN KEY ("countryShortName") REFERENCES "Country"("shortName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAttendees" ADD CONSTRAINT "_EventAttendees_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAttendees" ADD CONSTRAINT "_EventAttendees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tradespot" ADD CONSTRAINT "_Tradespot_A_fkey" FOREIGN KEY ("A") REFERENCES "Tradespot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tradespot" ADD CONSTRAINT "_Tradespot_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
