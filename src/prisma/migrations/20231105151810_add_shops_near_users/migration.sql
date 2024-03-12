-- CreateTable
CREATE TABLE "_UsersNearByShops" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsersNearByShops_AB_unique" ON "_UsersNearByShops"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersNearByShops_B_index" ON "_UsersNearByShops"("B");

-- AddForeignKey
ALTER TABLE "_UsersNearByShops" ADD CONSTRAINT "_UsersNearByShops_A_fkey" FOREIGN KEY ("A") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersNearByShops" ADD CONSTRAINT "_UsersNearByShops_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
