-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "colaborador_id" INTEGER NOT NULL,
    CONSTRAINT "Registro_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "Colaborador" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Registro" ("colaborador_id", "data", "id", "status") SELECT "colaborador_id", "data", "id", "status" FROM "Registro";
DROP TABLE "Registro";
ALTER TABLE "new_Registro" RENAME TO "Registro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
