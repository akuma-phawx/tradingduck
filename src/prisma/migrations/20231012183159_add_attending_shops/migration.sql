-- CreateTable
CREATE TABLE "_EventAttendingShops" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventAttendingShops_AB_unique" ON "_EventAttendingShops"("A", "B");

-- CreateIndex
CREATE INDEX "_EventAttendingShops_B_index" ON "_EventAttendingShops"("B");

-- AddForeignKey
ALTER TABLE "_EventAttendingShops" ADD CONSTRAINT "_EventAttendingShops_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAttendingShops" ADD CONSTRAINT "_EventAttendingShops_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
