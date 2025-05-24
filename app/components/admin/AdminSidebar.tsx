"use client";

import { LayoutDashboard, Users, BookOpen, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const links = [
	{ label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
	{ label: "Users", icon: Users, href: "/admin/users" },
	{ label: "Courses", icon: BookOpen, href: "/admin/courses" },
	{ label: "Catégories", icon: Layers, href: "/admin/categories" },
];

interface AdminSidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, setOpen }) => {
	return (
		<>
			{/* Overlay for mobile */}
			{open && (
				<div
					className="fixed inset-0 bg-black/30 z-40 md:hidden"
					onClick={() => setOpen(false)}
				/>
			)}

			<aside
				className={`
    h-full bg-white border-r flex flex-col justify-start py-6 px-2 z-50 transition-all duration-300
    ${open ? "w-64" : "w-16"}
  `}
			>
				{/* Toggle button */}
				<button
					className="mb-8 p-2 rounded-md hover:bg-gray-100 transition self-end"
					onClick={() => setOpen(!open)}
					aria-label={open ? "Réduire le menu" : "Agrandir le menu"}
				>
					{open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
				</button>
				{/* Logo */}
				<div
					className={`
          text-2xl font-bold text-violet-600 mb-8 transition-all duration-300
          ${open ? "block" : "hidden"}
        `}
				>
					EduHub Admin
				</div>
				<nav className="flex flex-col gap-2">
					{links.map(({ label, icon: Icon, href }) => (
						<Link
							key={href}
							href={href}
							className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-violet-50 transition"
						>
							<Icon className="w-5 h-5" />
							<span
								className={`transition-all duration-300 ${
									open ? "block" : "hidden"
								}`}
							>
								{label}
							</span>
						</Link>
					))}
				</nav>
			</aside>
		</>
	);
};