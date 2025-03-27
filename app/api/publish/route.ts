import { NextRequest, NextResponse } from "next/server";

// In-memory database (replace with real DB in production)
let courses: {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}[] = [];

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    
    // Validate required fields with friendly error messages
    if (!requestData.title?.trim()) {
      return NextResponse.json(
        { 
          done: false, 
          error: "Please provide a course title - this helps students understand what they'll learn" 
        }, 
        { status: 400 }
      );
    }

    if (!requestData.description?.trim()) {
      return NextResponse.json(
        { 
          done: false, 
          error: "A detailed description helps students know what to expect - please share what your course covers" 
        }, 
        { status: 400 }
      );
    }

    // Process tags - convert string to array and clean up
    let tags: string[] = [];
    if (typeof requestData.tags === 'string') {
      tags = requestData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
    } else if (Array.isArray(requestData.tags)) {
      tags = requestData.tags.filter((tag: string) => typeof tag === 'string');
    }
    if (tags.length === 0) {
      return NextResponse.json(
        { 
          done: false, 
          error: "Please add at least one tag - this helps students find your course" 
        }, 
        { status: 400 }
      );
    }

    // Create the course with friendly defaults
    const newCourse = {
      id: courses.length + 1,
      title: requestData.title.trim(),
      description: requestData.description.trim(),
      category: requestData.category?.trim() || 'other',
      tags,
      status: requestData.status === 'published' ? 'published' as const : 'draft' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // "Save" to our in-memory database
    courses.push(newCourse);

    // Return success response with helpful metadata
    return NextResponse.json(
      {
        done: true,
        course: newCourse,
        message: newCourse.status === 'published' 
          ? "Your course is now live! Students can begin enrolling." 
          : "Draft saved successfully. You can publish it anytime."
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Course creation failed:", error);
    return NextResponse.json(
      { 
        done: false, 
        error: "We encountered an unexpected error while saving your course. Please try again." 
      },
      { status: 500 }
    );
  }
}

// Additional helper endpoint to get published courses
export async function GET() {
  const publishedCourses = courses.filter(course => course.status === 'published');
  
  return NextResponse.json(
    {
      done: true,
      count: publishedCourses.length,
      courses: publishedCourses,
      message: publishedCourses.length === 0
        ? "No published courses yet. Create one to get started!"
        : `Found ${publishedCourses.length} published courses`
    },
    { status: 200 }
  );
}