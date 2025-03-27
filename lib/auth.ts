import bcrypt from "bcryptjs";
import clientPromise from "./mongodb";
import { User } from "./types";

export async function createUser(userData: User) {
  const client = await clientPromise;
  const db = client.db("database");

  const existingUser = await db
    .collection("user")
    .findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const result = await db.collection("user").insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function findUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("database");
  return db.collection("user").findOne({ email });
}

export async function validatePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}
