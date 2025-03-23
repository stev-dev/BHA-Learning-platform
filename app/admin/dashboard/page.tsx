// app/admin/dashboard/page.tsx
import React from 'react';
import { ChartComponent } from './ChartComponent';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-xl rounded-lg p-6 transition duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700">Total Courses</h2>
          <p className="text-3xl font-bold text-blue-600">350</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 transition duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700">Total Students</h2>
          <p className="text-3xl font-bold text-blue-600">2,850</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 transition duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700">Total Instructors</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Recent Activities</h2>
        <ul className="space-y-4 mt-4">
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 rounded-lg transition duration-300">
            <span className="text-gray-700">Course "React for Beginners" was published.</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 rounded-lg transition duration-300">
            <span className="text-gray-700">New user "John Doe" signed up.</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 rounded-lg transition duration-300">
            <span className="text-gray-700">Instructor "Jane Smith" updated their profile.</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>
      </div>
      <div className="h-64 bg-white shadow-xl rounded-lg mt-4 p-6">
  <ChartComponent />
</div>

      {/* Activity Graph (Placeholder) */}
      <div className="bg-white shadow-xl rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Activity Graph</h2>
        <div className="h-64 bg-gray-200 rounded-lg mt-4 flex items-center justify-center">
          <span className="text-gray-500">Graph Placeholder (can integrate a chart library here)</span>
        </div>
      </div>
    </div>
    
  );
}



