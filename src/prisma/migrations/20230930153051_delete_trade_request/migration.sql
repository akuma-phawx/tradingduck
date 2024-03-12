-- DropForeignKey
ALTER TABLE "TradeRequestMessage" DROP CONSTRAINT "TradeRequestMessage_tradeRequestId_fkey";

-- AddForeignKey
ALTER TABLE "TradeRequestMessage" ADD CONSTRAINT "TradeRequestMessage_tradeRequestId_fkey" FOREIGN KEY ("tradeRequestId") REFERENCES "TradeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
