-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "setId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "image" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "UserCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeBox" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TradeBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeRequest" (
    "id" SERIAL NOT NULL,
    "sendUserId" INTEGER NOT NULL,
    "incUserId" INTEGER NOT NULL,
    "tradeStatusId" INTEGER NOT NULL,

    CONSTRAINT "TradeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeRequestMessage" (
    "id" SERIAL NOT NULL,
    "tradeRequestId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeRequestMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TradeStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCardToWishList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeBoxToUserCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeRequestWantCards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeRequestGiveCards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCardToWishList_AB_unique" ON "_UserCardToWishList"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCardToWishList_B_index" ON "_UserCardToWishList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeBoxToUserCard_AB_unique" ON "_TradeBoxToUserCard"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeBoxToUserCard_B_index" ON "_TradeBoxToUserCard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeRequestWantCards_AB_unique" ON "_TradeRequestWantCards"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeRequestWantCards_B_index" ON "_TradeRequestWantCards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeRequestGiveCards_AB_unique" ON "_TradeRequestGiveCards"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeRequestGiveCards_B_index" ON "_TradeRequestGiveCards"("B");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeBox" ADD CONSTRAINT "TradeBox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeRequest" ADD CONSTRAINT "TradeRequest_sendUserId_fkey" FOREIGN KEY ("sendUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeRequest" ADD CONSTRAINT "TradeRequest_incUserId_fkey" FOREIGN KEY ("incUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeRequest" ADD CONSTRAINT "TradeRequest_tradeStatusId_fkey" FOREIGN KEY ("tradeStatusId") REFERENCES "TradeStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeRequestMessage" ADD CONSTRAINT "TradeRequestMessage_tradeRequestId_fkey" FOREIGN KEY ("tradeRequestId") REFERENCES "TradeRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeRequestMessage" ADD CONSTRAINT "TradeRequestMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCardToWishList" ADD CONSTRAINT "_UserCardToWishList_A_fkey" FOREIGN KEY ("A") REFERENCES "UserCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCardToWishList" ADD CONSTRAINT "_UserCardToWishList_B_fkey" FOREIGN KEY ("B") REFERENCES "WishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeBoxToUserCard" ADD CONSTRAINT "_TradeBoxToUserCard_A_fkey" FOREIGN KEY ("A") REFERENCES "TradeBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeBoxToUserCard" ADD CONSTRAINT "_TradeBoxToUserCard_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeRequestWantCards" ADD CONSTRAINT "_TradeRequestWantCards_A_fkey" FOREIGN KEY ("A") REFERENCES "TradeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeRequestWantCards" ADD CONSTRAINT "_TradeRequestWantCards_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeRequestGiveCards" ADD CONSTRAINT "_TradeRequestGiveCards_A_fkey" FOREIGN KEY ("A") REFERENCES "TradeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeRequestGiveCards" ADD CONSTRAINT "_TradeRequestGiveCards_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
