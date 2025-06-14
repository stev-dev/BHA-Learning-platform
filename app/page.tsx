"use client";

import {
  Star,
  Users,
  Award,
  ArrowRight,
  Building2,
  Megaphone,
  DollarSign,
  BarChart3,
  Search,
} from "lucide-react";

export default function LandingPage() {
  const courses = [
    {
      title: "Modern Business Strategy",
      instructor: "Marie Dubois",
      image: "/images/course1.png",
      rating: 4.6,
      students: 1240,
      price: 49.99,
    },
    {
      title: "Advanced Digital Marketing",
      instructor: "Ahmed Benali",
      image: "/images/course2.png",
      rating: 4.8,
      students: 890,
      price: 59.99,
    },
    {
      title: "SME Financial Management",
      instructor: "Sophie Laurent",
      image: "/images/course3.png",
      rating: 4.5,
      students: 650,
      price: 39.99,
    },
    {
      title: "Leadership Excellence",
      instructor: "David Chen",
      image: "/images/leadership.png",
      rating: 4.7,
      students: 980,
      price: 54.99,
    },
    {
      title: "Business Analytics Mastery",
      instructor: "Sarah Johnson",
      image: "/images/analytics.png",
      rating: 4.6,
      students: 720,
      price: 64.99,
    },
    {
      title: "Entrepreneurship Fundamentals",
      instructor: "Michael Rodriguez",
      image: "/images/entrepreunariat.png",
      rating: 4.8,
      students: 1150,
      price: 44.99,
    },
  ];

  const instructors = [
    {
      name: "Marie Dubois",
      role: "Strategy Expert",
      bio: "15 years of experience in strategic consulting.",
    },
    {
      name: "Ahmed Benali",
      role: "Digital Marketing",
      bio: "Digital transformation expert with 12 years of experience.",
    },
    {
      name: "Sophie Laurent",
      role: "Finance",
      bio: "Financial director specialized in SME support.",
    },
  ];

  const stats = [
    { icon: Users, value: "2.5K+", label: "Students" },
    { icon: DollarSign, value: "$150K+", label: "Revenue" },
    { icon: Award, value: "25+", label: "Instructors" },
  ];

  const categories = [
    { icon: Building2, name: "Business Strategy", courses: 12 },
    { icon: Megaphone, name: "Digital Marketing", courses: 8 },
    { icon: DollarSign, name: "Finance", courses: 15 },
    { icon: Users, name: "Leadership", courses: 6 },
    { icon: BarChart3, name: "Analytics", courses: 9 },
    { icon: Award, name: "Entrepreneurship", courses: 11 },
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const handleCourseEnroll = (courseTitle: string) => {
    alert(`Course enrollment: ${courseTitle}\nPlease log in first.`);
  };

  const handleBecomeInstructor = () => {
    alert("To become an instructor, please contact us at instructor@bha.com");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => handleNavigation("/")}>
            <img src="/images/logo.png" alt="BHA" className="h-8 w-auto" />
          </button>
          <div className="hidden md:flex items-center space-x-6">
            {["Home", "Courses", "Instructors", "Contact Us"].map((item, i) => (
              <a
                key={i}
                href={
                  item === "Contact Us"
                    ? "#"
                    : `#${item.toLowerCase().replace(" ", "")}`
                }
                className="text-gray-700 hover:text-slate-800"
                onClick={
                  item === "Contact Us"
                    ? (e) => {
                        e.preventDefault();
                        alert("Contact us at: bha@gmail.com");
                      }
                    : item === "Courses"
                    ? (e) => {
                        e.preventDefault();
                        document
                          .getElementById("courses")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    : item === "Home"
                    ? (e) => {
                        e.preventDefault();
                        document
                          .getElementById("home")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    : item === "Instructors"
                    ? (e) => {
                        e.preventDefault();
                        document
                          .getElementById("instructors")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    : undefined
                }
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            <button
              onClick={() => handleNavigation("/login")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-600 text-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Learn <span className="text-orange-400">Without Limits</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Discover thousands of expert-led courses to accelerate your career
              and unlock your potential with cutting-edge AI-enhanced learning.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <div className="w-full bg-orange-500 h-1 rounded-full mb-6"></div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Your desired training
            </h2>
            <select className="w-full bg-white text-slate-900 h-14 mb-6 px-4 rounded-lg border text-lg">
              <option value="">Choose your training</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat.name.toLowerCase()}>
                  {cat.name} ({cat.courses} courses)
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full bg-orange-500 hover:bg-orange-600 h-14 text-white rounded-lg font-semibold text-lg transition-colors"
            >
              Start Learning
            </button>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Our Popular Courses
            </h2>
            <p className="text-slate-600">
              Discover our most requested courses across all categories
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                  <p className="text-slate-600 text-sm mb-2">
                    By {course.instructor}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{course.rating}</span>
                      <span className="text-slate-500 text-sm ml-1">
                        ({course.students})
                      </span>
                    </div>
                    <span className="text-lg font-bold">{course.price}€</span>
                  </div>
                  <button
                    onClick={() => handleCourseEnroll(course.title)}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-md"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Instructors */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 mb-16 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-2">
                  <stat.icon className="w-6 h-6 text-slate-800" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Our Expert Instructors
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6" id="instructors">
            {instructors.map((instructor, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-slate-700 text-sm mb-2">
                    {instructor.role}
                  </p>
                  <p className="text-slate-600 text-sm">{instructor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Our Areas of Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() =>
                  alert(
                    `Category: ${cat.name}\n${cat.courses} courses available`
                  )
                }
              >
                <div className="p-4 text-center">
                  <cat.icon className="w-6 h-6 text-slate-800 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
                  <p className="text-slate-600 text-sm">
                    {cat.courses} courses
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Share Your Expertise</h2>
          <p className="text-slate-200 mb-6">
            Join our community of expert instructors
          </p>
          <button
            onClick={handleBecomeInstructor}
            className="bg-white text-slate-800 hover:bg-slate-100 px-6 py-3 rounded-md font-medium inline-flex items-center"
          >
            Become Instructor <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <button onClick={() => handleNavigation("/")}>
                <img
                  src="/images/logo.png"
                  alt="BHA"
                  className="h-8 w-auto mb-3 brightness-0 invert"
                />
              </button>
              <p className="text-slate-400 text-sm">
                Your partner for business excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Courses</h4>
              <ul className="space-y-1 text-slate-400 text-sm">
                {["Strategy", "Marketing", "Finance"].map((item, i) => (
                  <li key={i}>
                    <a href="#courses" className="hover:text-slate-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-1 text-slate-400 text-sm">
                {["Contact", "FAQ", "Help"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-slate-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-6 pt-6 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Business House Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
