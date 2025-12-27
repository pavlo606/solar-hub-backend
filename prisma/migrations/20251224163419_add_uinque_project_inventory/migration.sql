/*
  Warnings:

  - A unique constraint covering the columns `[projectId,inventoryItemId]` on the table `ProjectMaterial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectMaterial_projectId_inventoryItemId_key" ON "ProjectMaterial"("projectId", "inventoryItemId");
