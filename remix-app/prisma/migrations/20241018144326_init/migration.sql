-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "httpMethod" TEXT NOT NULL,
    "baseUrl" TEXT,
    "defaultTo" TEXT,
    "path" TEXT NOT NULL,
    "uniqueKey" TEXT NOT NULL,
    "uniqueKeyLocation" TEXT NOT NULL,
    "uniqueKeyPath" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UniqueKey" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "userMappingId" INTEGER NOT NULL,
    CONSTRAINT "UniqueKey_userMappingId_fkey" FOREIGN KEY ("userMappingId") REFERENCES "UserResponseMapping" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserResponseMapping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "response" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "UserResponseMapping_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_serviceName_key" ON "Service"("serviceName");
