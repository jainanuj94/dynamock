-- CreateTable
CREATE TABLE "Api" (
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
    "startingValue" TEXT NOT NULL,
    "incrementRule" TEXT NOT NULL,
    "customRule" TEXT,
    "userResponseMappingId" INTEGER,
    CONSTRAINT "UniqueKey_userResponseMappingId_fkey" FOREIGN KEY ("userResponseMappingId") REFERENCES "UserResponseMapping" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserResponseMapping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "api_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "responses" TEXT NOT NULL,
    CONSTRAINT "UserResponseMapping_api_id_fkey" FOREIGN KEY ("api_id") REFERENCES "Api" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_serviceName_key" ON "Api"("serviceName");
