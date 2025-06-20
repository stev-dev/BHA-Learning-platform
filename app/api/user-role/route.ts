import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkUserId: { type: String, required: true, unique: true },
    roles: [{ type: String, enum: ["student", "instructor"] }],
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: NextRequest) {
    try {
        const { clerkUserId, roles } = await req.json();
        if (!clerkUserId || !roles || !Array.isArray(roles)) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        await clientPromise;
        await User.findOneAndUpdate(
            { clerkUserId },
            { $set: { roles } },
            { upsert: true, new: true }
        );
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const clerkUserId = searchParams.get("clerkUserId");
        if (!clerkUserId) {
            return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
        }
        await clientPromise;
        const user = await User.findOne({ clerkUserId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ roles: user.roles });
    } catch (e) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
} 