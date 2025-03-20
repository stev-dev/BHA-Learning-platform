import { NextRequest, NextResponse } from "next/server";

let categories: { id: number; name: string; description?: string }[] = [];

export async function GET() {
  return NextResponse.json({ done: true, categories }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ done: false, error: "Category name is required" }, { status: 400 });
    }

    const newCategory = { id: categories.length + 1, name, description };
    categories.push(newCategory);

    return NextResponse.json({ done: true, category: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ done: false, error: "Error creating category" }, { status: 500 });
  }
}
