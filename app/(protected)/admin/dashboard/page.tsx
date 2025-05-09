"use client";

import Card from "@/app/components/ui/Card";



const DashboardPage = () => {
  // Example data for the dashboard
  const stats = [
    { title: "Total Users", value: 120, icon: "👤" },
    { title: "Total Courses", value: 45, icon: "📚" },
    { title: "Total Categories", value: 10, icon: "📂" },
    { title: "Active Instructors", value: 15, icon: "👨‍🏫" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{stat.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{stat.title}</h2>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
