/*
  Warnings:

  - You are about to drop the column `pendete` on the `Colaborador` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "pendente" BOOLEAN DEFAULT false,
    "qtd_pendente" INTEGER DEFAULT 0,
    "area_id" INTEGER,
    "vinculo_id" INTEGER,
    CONSTRAINT "Colaborador_vinculo_id_fkey" FOREIGN KEY ("vinculo_id") REFERENCES "Vinculo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Colaborador_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Colaborador" ("area_id", "id", "nome", "numero", "qtd_pendente", "vinculo_id") SELECT "area_id", "id", "nome", "numero", "qtd_pendente", "vinculo_id" FROM "Colaborador";
DROP TABLE "Colaborador";
ALTER TABLE "new_Colaborador" RENAME TO "Colaborador";
CREATE UNIQUE INDEX "Colaborador_numero_key" ON "Colaborador"("numero");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
