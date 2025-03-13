"use client";

import { Book, Users } from "lucide-react";

const mockData = {
    stats: {
      totalCourses: 12,
      totalStudents: 456,
      totalRevenue: 34500,
    },
    recentActivity: [
      { day: "Mon", students: 4 },
      { day: "Tue", students: 7 },
      { day: "Wed", students: 5 },
      { day: "Thu", students: 8 },
      { day: "Fri", students: 12 },
      { day: "Sat", students: 9 },
      { day: "Sun", students: 6 },
    ],
  };

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your courses.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
            <Book className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{mockData.stats.totalCourses}</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{mockData.stats.totalStudents}</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
        <div className="space-y-3">
          {mockData.recentActivity.map((item) => (
            <div key={item.day} className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{item.day}</span>
              <span className="font-medium">{item.students} students</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
