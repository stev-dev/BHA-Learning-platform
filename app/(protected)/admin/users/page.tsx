"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Table } from "@/app/components/ui/Table";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { Avatar } from "@/app/components/ui/Avatar";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { Modal } from "@/app/components/ui/Modal";
import { UserForm } from "@/app/components/admin/UserForm";
import { User, Users, UserCog, UserPlus, Eye, Edit, X } from "lucide-react";

const mockUsers = [
	{
		id: 1,
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "Student",
		courses: 4,
		status: "Active",
		joined: "2023-03-15",
	},
	{
		id: 2,
		name: "Robert Smith",
		email: "robert@example.com",
		role: "Student",
		courses: 6,
		status: "Active",
		joined: "2023-04-22",
	},
	{
		id: 3,
		name: "Emily Davis",
		email: "emily@example.com",
		role: "Instructor",
		courses: 2,
		status: "Active",
		joined: "2023-02-10",
	},
	{
		id: 4,
		name: "Michael Wilson",
		email: "michael@example.com",
		role: "Instructor",
		courses: 3,
		status: "Active",
		joined: "2023-01-05",
	},
	{
		id: 5,
		name: "Sarah Thompson",
		email: "sarah@example.com",
		role: "Student",
		courses: 1,
		status: "Inactive",
		joined: "2023-05-17",
	},
	{
		id: 6,
		name: "David Brown",
		email: "david@example.com",
		role: "Student",
		courses: 3,
		status: "Active",
		joined: "2023-06-20",
	},
	{
		id: 7,
		name: "Jennifer Lee",
		email: "jennifer@example.com",
		role: "Instructor",
		courses: 1,
		status: "Pending",
		joined: "2023-07-12",
	},
	{
		id: 8,
		name: "Thomas Anderson",
		email: "thomas@example.com",
		role: "Admin",
		courses: 0,
		status: "Active",
		joined: "2023-01-01",
	},
];

const roleColors = {
	Student: "bg-blue-100 text-blue-600",
	Instructor: "bg-purple-100 text-purple-600",
	Admin: "bg-red-100 text-red-600",
};

const statusColors = {
	Active: "bg-green-100 text-green-600",
	Inactive: "bg-gray-300 text-gray-700",
	Pending: "bg-yellow-100 text-yellow-700",
};

const filters = [
	{ label: "All Users", value: "all" },
	{ label: "Students", value: "Student" },
	{ label: "Instructors", value: "Instructor" },
	{ label: "Admins", value: "Admin" },
];

export default function AdminUsers() {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [usersList, setUsersList] = useState(mockUsers);
	const [filter, setFilter] = useState("all");
	const [modalOpen, setModalOpen] = useState(false);
	const [editUser, setEditUser] = useState<any>(null);

	const handleDelete = (id: number) => {
		setUsersList(usersList.filter((u) => u.id !== id));
	};

	const handleAddUser = (data: any) => {
		setUsersList([
			...usersList,
			{
				...data,
				id: usersList.length + 1,
				courses: 0,
				joined: new Date().toISOString().slice(0, 10),
			},
		]);
		setModalOpen(false);
	};

	const handleEditUser = (user: any) => {
		setEditUser(user);
		setModalOpen(true);
	};

	const handleSubmitUser = (data: any) => {
		if (editUser) {
			setUsersList(
				usersList.map((u) => (u.id === editUser.id ? { ...u, ...data } : u))
			);
		} else {
			setUsersList([
				...usersList,
				{
					...data,
					id: usersList.length + 1,
					courses: 0,
					joined: new Date().toISOString().slice(0, 10),
				},
			]);
		}
		setModalOpen(false);
		setEditUser(null);
	};

	const filtered = usersList.filter(
		(u) =>
			(filter === "all" || u.role === filter) &&
			(u.name.toLowerCase().includes(search.toLowerCase()) ||
				u.email.toLowerCase().includes(search.toLowerCase()))
	);

	const usersPerPage = 10;
	const totalPages = Math.max(1, Math.ceil(filtered.length / usersPerPage));
	const users = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);

	// Stats
	const stats = [
		{
			label: "Students",
			value: usersList.filter((u) => u.role === "Student").length,
			icon: <User className="text-blue-400" size={28} />,
			color: "bg-blue-50",
		},
		{
			label: "Instructors",
			value: usersList.filter((u) => u.role === "Instructor").length,
			icon: <UserCog className="text-purple-400" size={28} />,
			color: "bg-purple-50",
		},
		{
			label: "Administrators",
			value: usersList.filter((u) => u.role === "Admin").length,
			icon: <Users className="text-red-400" size={28} />,
			color: "bg-red-50",
		},
	];

	return (
		<div className="p-4 md:p-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
				<Button
					className="h-10 px-4 bg-violet-400 text-white font-semibold rounded-lg flex items-center gap-2"
					onClick={() => {
						setEditUser(null);
						setModalOpen(true);
					}}
				>
					<UserPlus size={18} /> Add User
				</Button>
			</div>
			<div className="flex flex-wrap gap-4 mb-6">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className={`flex-1 min-w-[180px] flex items-center gap-4 rounded-xl p-4 ${stat.color} border`}
					>
						<div>{stat.icon}</div>
						<div>
							<div className="text-2xl font-bold">{stat.value}</div>
							<div className="text-gray-500">{stat.label}</div>
						</div>
					</div>
				))}
			</div>
			<div className="mb-4 flex flex-wrap gap-2 items-center">
				<SearchBar
					onSearch={setSearch}
					placeholder="Search users..."
					className="flex-1 min-w-[220px]"
				/>
				<div className="flex gap-2">
					{filters.map((f) => (
						<Button
							key={f.value}
							className={`px-4 py-2 rounded-lg font-semibold ${
								filter === f.value
									? "bg-violet-400 text-white"
									: "bg-gray-100 text-gray-700"
							}`}
							onClick={() => setFilter(f.value)}
						>
							{f.label}
						</Button>
					))}
				</div>
			</div>
			<Card>
				<Table
					headers={[
						"Name",
						"Email",
						"Role",
						"Courses",
						"Status",
						"Joined Date",
						"Actions",
					]}
					rows={users.map((u) => [
						<div className="flex items-center gap-2" key={u.id}>
							<Avatar name={u.name} />
							<span className="font-semibold">{u.name}</span>
						</div>,
						u.email,
						<Badge
							colorClass={
								roleColors[u.role as keyof typeof roleColors] ||
								"bg-gray-100 text-gray-700"
							}
						>
							{u.role}
						</Badge>,
						u.courses,
						<Badge
							colorClass={
								statusColors[u.status as keyof typeof statusColors] ||
								"bg-gray-100 text-gray-700"
							}
						>
							{u.status}
						</Badge>,
						u.joined,
						<div className="flex gap-2">
							<Button variant="ghost" size="icon">
								<Eye size={18} />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => handleEditUser(u)}
							>
								<Edit size={18} />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => handleDelete(u.id)}
							>
								<X size={18} className="text-red-500" />
							</Button>
						</div>,
					])}
				/>
			</Card>
			{/* Modal d'ajout/modification */}
			<Modal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setEditUser(null);
				}}
				title={editUser ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
			>
				<UserForm
					onSubmit={handleSubmitUser}
					initialValues={editUser}
				/>
			</Modal>
		</div>
	);
}