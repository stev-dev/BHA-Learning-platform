"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  category: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
});

export default function PublishCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>, status: 'published' | 'draft') {
    const loadingState = status === 'published' ? setIsSubmitting : setIsSavingDraft;
    loadingState(true);

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          status: status
        }),
      });

      const data = await response.json();

      if (!data.done) {
        throw new Error(data.error || 'Failed to save course');
      }

      toast.success(status === 'published' 
        ? 'Course published successfully!' 
        : 'Draft saved successfully!');
      
      router.push(status === 'published' 
        ? `/courses/${data.course.id}` 
        : '/dashboard/courses?draft=true');
        
    } catch (error) {
      toast.error(
        error instanceof Error 
          ? error.message 
          : `Failed to ${status === 'published' ? 'publish' : 'save draft'} course`
      );
    } finally {
      loadingState(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSubmit(values, 'published');
  }

  async function saveAsDraft() {
    const values = form.getValues();
    await handleSubmit(values, 'draft');
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Publish a New Course</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to create and publish your course.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  {...form.register("title")}
                  className={`w-full px-3 py-2 border rounded-md ${
                    form.formState.errors.title ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Introduction to..."
                />
                {form.formState.errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.title.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Choose a clear and engaging title for your course.
                </p>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Description
                </label>
                <textarea
                  {...form.register("description")}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md ${
                    form.formState.errors.description ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Describe your course..."
                />
                {form.formState.errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.description.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Provide a detailed description of what students will learn.
                </p>
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  {...form.register("category")}
                  className={`w-full px-3 py-2 border rounded-md ${
                    form.formState.errors.category ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
                {form.formState.errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.category.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Choose the most relevant category for your course.
                </p>
              </div>

              {/* Tags Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  {...form.register("tags")}
                  className={`w-full px-3 py-2 border rounded-md ${
                    form.formState.errors.tags ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="web development, javascript, react"
                />
                {form.formState.errors.tags && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.tags.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Add relevant tags separated by commas.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Publishing..." : "Publish Course"}
              </button>
              <button
                type="button"
                onClick={saveAsDraft}
                disabled={isSavingDraft}
                className={`px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors ${
                  isSavingDraft ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSavingDraft ? "Saving..." : "Save as Draft"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}