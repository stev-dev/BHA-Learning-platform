"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  category: z.string(),
  tags: z.string(),
});

export default function PublishCoursePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Publish a New Course</h2>
        <p className="text-gray-500">
          Fill in the details below to create and publish your course.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Course Title</span>
              <input
                type="text"
                {...form.register("title")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Introduction to..."
              />
              {form.formState.errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Choose a clear and engaging title for your course.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Course Description</span>
              <textarea
                {...form.register("description")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={4}
                placeholder="Describe your course..."
              />
              {form.formState.errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Provide a detailed description of what students will learn.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Category</span>
              <select
                {...form.register("category")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
              {form.formState.errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.category.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Choose the most relevant category for your course.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Tags</span>
              <input
                type="text"
                {...form.register("tags")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="web development, javascript, react"
              />
              {form.formState.errors.tags && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.tags.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Add relevant tags separated by commas.
              </p>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Publish Course
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}