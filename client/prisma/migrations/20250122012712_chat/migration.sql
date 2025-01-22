/*
  Warnings:

  - The values [USER,MODEL] on the enum `Messager` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Messager_new" AS ENUM ('user', 'model');
ALTER TABLE "ChatMessage" ALTER COLUMN "role" TYPE "Messager_new" USING ("role"::text::"Messager_new");
ALTER TYPE "Messager" RENAME TO "Messager_old";
ALTER TYPE "Messager_new" RENAME TO "Messager";
DROP TYPE "Messager_old";
COMMIT;
