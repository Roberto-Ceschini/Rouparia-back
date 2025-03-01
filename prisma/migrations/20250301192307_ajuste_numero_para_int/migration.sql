/*
  Warnings:

  - You are about to alter the column `numero` on the `Colaborador` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "area_id" INTEGER,
    CONSTRAINT "Colaborador_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Colaborador" ("area_id", "id", "nome", "numero") SELECT "area_id", "id", "nome", "numero" FROM "Colaborador";
DROP TABLE "Colaborador";
ALTER TABLE "new_Colaborador" RENAME TO "Colaborador";
CREATE UNIQUE INDEX "Colaborador_numero_key" ON "Colaborador"("numero");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
