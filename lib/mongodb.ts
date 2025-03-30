import { MongoClient } from "mongodb";

const uri =  process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
export {};
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // En développement, utilise une variable globale pour préserver la connexion
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, crée une nouvelle connexion
  client = new MongoClient(uri!, options);
  clientPromise = client.connect();
}

export default clientPromise;
