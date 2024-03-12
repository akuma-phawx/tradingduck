-- CreateTable
CREATE TABLE "Streamer" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userImage" TEXT,
    "banner" TEXT,

    CONSTRAINT "Streamer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_nickname_key" ON "Streamer"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_url_key" ON "Streamer"("url");
