import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { userId, email, roles } = await req.json();
  if (!userId || !email || !roles) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db("learningplateform");
  const users = db.collection("users");
  await users.updateOne(
    { userId },
    { $set: { userId, email, roles } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
} 