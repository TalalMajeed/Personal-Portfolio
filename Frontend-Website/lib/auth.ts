import { createHash } from "crypto";
import type { Collection } from "mongodb";
import { getDb } from "./mongodb";

const DEFAULT_ADMIN_EMAIL = "admin@talalmajeed.com";
const DEFAULT_ADMIN_PASSWORD = "helloworld";
const USERS_COLLECTION = "users";

type UserDocument = {
  email: string;
  passwordHash: string;
  role?: string;
  createdAt: Date;
};

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

async function getUsersCollection(): Promise<Collection<UserDocument>> {
  const db = await getDb();
  return db.collection<UserDocument>(USERS_COLLECTION);
}

export async function ensureDefaultAdmin(): Promise<void> {
  const users = await getUsersCollection();

  const existing = await users.findOne({ email: DEFAULT_ADMIN_EMAIL });

  if (!existing) {
    await users.insertOne({
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
      role: "admin",
      createdAt: new Date(),
    });
  }
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const users = await getUsersCollection();
  const user = await users.findOne({ email });

  if (!user) return false;

  const passwordHash = hashPassword(password);
  return user.passwordHash === passwordHash;
}

