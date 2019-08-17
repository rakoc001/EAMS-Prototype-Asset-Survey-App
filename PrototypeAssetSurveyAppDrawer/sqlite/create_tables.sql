CREATE TABLE "assets" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "AssetID" TEXT UNIQUE NOT NULL,
    "Condition" TEXT NOT NULL,
    "Status" TEXT NOT NULL, 
    "CreatedDate" TEXT NOT NULL,
    "ChangedDate" TEXT NOT NULL,
    "ChangedBy" INTEGER NOT NULL,
	  CONSTRAINT fk_users
	  FOREIGN KEY (ChangedBy)
	  REFERENCES users(UserID)
);

CREATE TABLE "users" (
    "UserID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT UNIQUE NOT NULL,
    "Password" TEXT NOT NULL
);
