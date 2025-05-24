"use client";

import { BookOpen, Users, User, BarChart2 } from "lucide-react";

const stats = [
	{
		icon: <BookOpen className="text-violet-400" size={28} />,
		value: "1,245",
		label: "Total Courses",
		growth: "+12%",
		growthColor: "bg-green-100 text-green-700",
	},
	{
		icon: <Users className="text-indigo-400" size={28} />,
		value: "45,231",
		label: "Total Students",
		growth: "+18%",
		growthColor: "bg-green-100 text-green-700",
	},
	{
		icon: <User className="text-orange-400" size={28} />,
		value: "684",
		label: "Instructors",
		growth: "+7%",
		growthColor: "bg-green-100 text-green-700",
	},
	{
		icon: <BarChart2 className="text-green-400" size={28} />,
		value: "$259,842",
		label: "Revenue",
		growth: "+24%",
		growthColor: "bg-green-100 text-green-700",
	},
];

const topCourses = [
	{
		name: "Machine Learning Fundamentals",
		students: 4521,
		revenue: "$45,210",
	},
	{
		name: "Web Development Bootcamp",
		students: 3842,
		revenue: "$38,420",
	},
	{
		name: "Data Science Masterclass",
		students: 3456,
		revenue: "$34,560",
	},
	{
		name: "Mobile App Development",
		students: 2870,
		revenue: "$28,700",
	},
	{
		name: "UX/UI Design Principles",
		students: 2345,
		revenue: "$23,450",
	},
];

// Mock data pour Student Growth (par mois)
const studentGrowthData = {
	labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"],
	data: [1200, 1500, 1800, 2100, 2500, 3000, 3500],
};

// Mock data pour Revenue & Course Growth (par mois)
const revenueCourseGrowthData = {
	labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"],
	revenue: [12000, 15000, 17000, 20000, 25000, 30000, 35000],
	courses: [10, 15, 18, 22, 28, 35, 40],
};

const AdminDashboard = () => {
	return (
		<div className="p-4 md:p-8">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				{stats.map((stat, idx) => (
					<div
						key={stat.label + idx}
						className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-3 shadow-sm"
					>
						<div className="flex items-center justify-between">
							{stat.icon}
							<span
								className={`text-xs px-2 py-1 rounded-full font-semibold ${stat.growthColor}`}
							>
								{stat.growth}
							</span>
						</div>
						<div className="text-3xl font-bold">{stat.value}</div>
						<div className="text-gray-500">{stat.label}</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl border border-gray-100 p-6 min-h-[320px] flex flex-col">
					<div className="text-xl font-bold mb-2">Student Growth</div>
					{/* <Chart
						labels={studentGrowthData.labels}
						datasets={[
							{
								label: "Students",
								data: studentGrowthData.data.map(Number), // S'assure que ce sont des nombres
								backgroundColor: "rgba(99,102,241,0.2)", // couleur avec opacité pour Chart.js
								borderColor: "#6366f1",
								fill: false,
								tension: 0.4,
							},
						]}
						type="line"
					/> */}
				</div>
				<div className="bg-white rounded-xl border border-gray-100 p-6 min-h-[320px] flex flex-col">
					<div className="text-xl font-bold mb-2">Revenue & Course Growth</div>
					{/* <Chart
						labels={revenueCourseGrowthData.labels}
						datasets={[
							{
								label: "Revenue",
								data: revenueCourseGrowthData.revenue.map(Number),
								backgroundColor: "rgba(52,211,153,0.2)",
								borderColor: "#34d399",
								yAxisID: "y",
								fill: false,
								tension: 0.4,
							},
							{
								label: "Courses",
								data: revenueCourseGrowthData.courses.map(Number),
								backgroundColor: "rgba(129,140,248,0.2)",
								borderColor: "#818cf8",
								yAxisID: "y1",
								fill: false,
								tension: 0.4,
							},
						]}
						options={{
							scales: {
								y: { type: "linear", position: "left", beginAtZero: true },
								y1: {
									type: "linear",
									position: "right",
									beginAtZero: true,
									grid: { drawOnChartArea: false },
								},
							},
						}}
						type="line"
					/> */}
				</div>
			</div>
			<div className="mt-8">
				<div className="bg-white rounded-xl border border-gray-100 p-6">
					<div className="text-2xl font-bold mb-6">Top Performing Courses</div>
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead>
								<tr className="text-left text-gray-700 border-b">
									<th className="py-2 pr-8 font-semibold">Rank</th>
									<th className="py-2 pr-8 font-semibold">Course Name</th>
									<th className="py-2 pr-8 font-semibold">Students</th>
									<th className="py-2 font-semibold">Revenue</th>
								</tr>
							</thead>
							<tbody>
								{topCourses.map((course, idx) => (
									<tr key={course.name} className="border-b last:border-b-0">
										<td className="py-2 pr-8">{idx + 1}</td>
										<td className="py-2 pr-8 font-medium">{course.name}</td>
										<td className="py-2 pr-8">
											{course.students.toLocaleString()}
										</td>
										<td className="py-2">{course.revenue}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;