import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db("learningplateform");
    const users = db.collection("users");
    const user = await users.findOne({ userId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ roles: user.roles, email: user.email });
} 