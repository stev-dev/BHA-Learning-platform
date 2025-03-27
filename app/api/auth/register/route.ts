import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth";
import { User } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, isPartner, diploma, subject, specialty } =
      body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const userData: User = {
      name,
      email,
      password,
      ...(isPartner && {
        isPartner,
        diploma,
        subject,
        specialty,
      }),
    };

    const newUser = await createUser(userData);

    // Simule un token (en production, utilisez jsonwebtoken)
    const token = `fake-jwt-token-${newUser.email}`;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { email: newUser.email, name: newUser.name },
        token, // Ajout du token dans la réponse
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
}
