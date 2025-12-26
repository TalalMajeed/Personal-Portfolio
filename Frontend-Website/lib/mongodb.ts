import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI environment variable is not set");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise:
    | Promise<MongoClient>
    | undefined;
}

let clientPromise: Promise<MongoClient>;

if (global._mongoClientPromise) {
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
  global._mongoClientPromise = clientPromise;
}

export async function getClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  const dbName = process.env.MONGO_DB_NAME || "talalmajeed";
  return client.db(dbName);
}

