/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Vinculo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Area_nome_key" ON "Area"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Vinculo_nome_key" ON "Vinculo"("nome");
