/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_secret_key" ON "ApiKey"("secret");

-- CreateIndex
CREATE INDEX "secret" ON "ApiKey"("secret");
