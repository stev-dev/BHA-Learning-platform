import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
        }
        const { roles } = await req.json();
        if (!roles || !Array.isArray(roles) || roles.length === 0) {
            return NextResponse.json({ error: "Rôles manquants" }, { status: 400 });
        }
        await clerkClient.users.updateUser(userId, {
            unsafeMetadata: { roles },
        });
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
} 