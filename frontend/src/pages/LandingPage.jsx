import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaBuilding,
  FaChartLine,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLock,
  FaServer,
  FaShieldAlt,
  FaTasks,
  FaUsers
} from "react-icons/fa";
import toast from "react-hot-toast";
import { login } from "../services/authService";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
          navigate("/dashboard", { replace: true });
      }

  }, [navigate]);

  const scrollToSection = (sectionId) => {
      document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth"
      });
  };

  const handleLogin = async (e) => {
      e.preventDefault();

      try {
          setLoggingIn(true);

          const response = await login({
              email,
              password,
          });

          if (response.success) {

              localStorage.setItem("token", response.data.token);

              localStorage.setItem("userId", response.data.userId);

              localStorage.setItem("fullName", response.data.fullName);

              localStorage.setItem("email", response.data.email);

              localStorage.setItem("role", response.data.role);

              navigate("/dashboard", { replace: true });

          }
      } catch (error) {

          console.error("Complete Error:", error);

          toast.error(
              error.response?.data?.message ||
              "Login failed. Please check your credentials."
          );

      } finally {
          setLoggingIn(false);
      }
  };

  const features = [
      {
          icon: <FaLock />,
          title: "Secure JWT Authentication",
          description: "Protect every dashboard session with token-based authentication."
      },
      {
          icon: <FaShieldAlt />,
          title: "Role-Based Authorization",
          description: "Organize access around users, roles, and operational responsibility."
      },
      {
          icon: <FaUsers />,
          title: "Employee Management",
          description: "Create, update, search, and manage employees from one place."
      },
      {
          icon: <FaBuilding />,
          title: "Department Management",
          description: "Keep company departments cleanly structured and easy to maintain."
      },
      {
          icon: <FaChartLine />,
          title: "Performance Analytics",
          description: "Track sales, tasks, satisfaction, and employee performance scores."
      },
      {
          icon: <FaBolt />,
          title: "Real-Time Dashboard",
          description: "View business summaries, trends, and top performers quickly."
      }
  ];

  const previewCards = [
      { label: "Employees", value: "128", color: "bg-blue-600" },
      { label: "Departments", value: "12", color: "bg-emerald-600" },
      { label: "Average Score", value: "86%", color: "bg-violet-600" },
      { label: "Total Sales", value: "₹42L", color: "bg-amber-500" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Navbar */}

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3"
          >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  C
              </div>

              <span className="text-lg md:text-xl font-bold text-slate-900">
                  Corporate Analytics Dashboard
              </span>
          </button>

          <div className="hidden lg:flex items-center gap-8 text-slate-600 font-medium">

              <button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition">
                  Home
              </button>

              <button onClick={() => scrollToSection("features")} className="hover:text-blue-600 transition">
                  Features
              </button>
    

              <button onClick={() => scrollToSection("about")} className="hover:text-blue-600 transition">
                  About
              </button>

              <button onClick={() => scrollToSection("login")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
                  Login
              </button>

          </div>

        </div>

      </nav>

      {/* Hero */}

      <section id="home" className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,#2563eb,transparent_35%),radial-gradient(circle_at_bottom_right,#38bdf8,transparent_30%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <p className="inline-flex items-center gap-2 bg-blue-500/15 text-blue-100 border border-blue-400/30 px-4 py-2 rounded-full font-semibold">
              <FaChartLine />
              Enterprise analytics for modern teams
            </p>

            <h1 className="mt-8 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Transform Employee Performance into Actionable Insights
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed">
              Monitor employee performance, department productivity, sales analytics, and organizational growth through a secure enterprise dashboard.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <button
                  onClick={() => scrollToSection("login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                  Login
                  <FaArrowRight />
              </button>

              <button
                  onClick={() => scrollToSection("features")}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-7 py-4 rounded-xl font-semibold transition"
              >
                  Explore Features
              </button>

            </div>

          </div>

          <div id="login" className="grid gap-6">

            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">

              <div className="text-center">

                <h2 className="text-3xl font-bold text-slate-800">
                  Welcome Back
                </h2>

                <p className="text-slate-500 mt-3">
                  Login to continue to the dashboard.
                </p>

              </div>

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >

                <div>

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                </div>

                <div>

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                </div>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition"
                >
                  {loggingIn ? "Logging in..." : "Login"}
                </button>

              </form>

            </div>

            <div className="bg-white/10 border border-white/15 rounded-3xl p-6 shadow-xl">

              <div className="grid grid-cols-2 gap-4">

                {previewCards.map((card) => (

                    <div key={card.label} className="bg-white rounded-2xl p-5 shadow-lg">

                        <div className={`w-10 h-10 rounded-xl ${card.color}`}></div>

                        <p className="mt-4 text-2xl font-bold text-slate-900">
                            {card.value}
                        </p>

                        <p className="text-slate-500 font-medium">
                            {card.label}
                        </p>

                    </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section id="features" className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl">

            <h2 className="text-4xl font-bold text-slate-900">
              Built for Complete Business Visibility
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Every module is designed to make employee, department, role, and performance operations easier to manage.
            </p>

          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature) => (

                <div key={feature.title} className="bg-white rounded-2xl shadow-lg p-7 hover:-translate-y-1 transition">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                        {feature.icon}
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-800">
                        {feature.title}
                    </h3>

                    <p className="mt-3 text-slate-500 leading-relaxed">
                        {feature.description}
                    </p>

                </div>

            ))}

          </div>

        </div>

      </section>

      {/* Analytics Preview */}

      <section className="py-20 px-6 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

            <div>

              <h2 className="text-4xl font-bold text-slate-900">
                Analytics Preview
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                A quick look at the operating metrics your dashboard can organize.
              </p>

            </div>

          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {previewCards.map((card) => (

                <div key={card.label} className="bg-slate-50 rounded-2xl shadow-lg p-7 border border-slate-100">

                    <div className={`w-12 h-12 rounded-xl ${card.color}`}></div>

                    <p className="mt-5 text-3xl font-bold text-slate-900">
                        {card.value}
                    </p>

                    <p className="mt-1 text-slate-500 font-medium">
                        {card.label}
                    </p>

                </div>

            ))}

          </div>

        </div>

      </section>


      {/* Footer */}

      <footer id="about" className="bg-slate-900 text-white px-6 py-12">

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

          <div className="md:col-span-2">

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
                    C
                </div>
                <h3 className="text-xl font-bold">
                    Corporate Analytics Dashboard
                </h3>
            </div>

            <p className="mt-4 text-slate-400 max-w-md">
                A secure analytics platform for managing people, departments, roles, and performance insights.
            </p>

          </div>

          <div>

            <h4 className="font-bold">Quick Links</h4>

            <div className="mt-4 space-y-2 text-slate-400">
                <button onClick={() => scrollToSection("home")} className="block hover:text-white transition">Home</button>
                <button onClick={() => scrollToSection("features")} className="block hover:text-white transition">Features</button>
                <button onClick={() => scrollToSection("contact")} className="block hover:text-white transition">Contact</button>
            </div>

          </div>

          <div>

            <h4 className="font-bold">Developer</h4>

            <p className="mt-4 text-slate-400 hover:text-white">
                Developed by Akash Kumar
            </p>

            <p className="mt-2 text-slate-400">
                2026
            </p>

            <div className="mt-5 flex gap-3 text-xl">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:border hover:border-white">
                  <a
                    href="https://github.com/akash-4x3"
                  >
                    <FaGithub />
                  </a>
                </span>
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:border hover:border-white">
                  <a
                    href="https://www.linkedin.com/in/akash-kumar-4x3"
                  >
                    <FaLinkedin />
                  </a>
                </span>
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:border hover:border-white">
                    <a
                      href="https://www.instagram.com/akash4x3/"
                    >
                      <FaInstagram/>
                    </a>
                </span>
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:border hover:border-white">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=akashkmrsn0123@gmail.com"
                    >
                      <FaEnvelope />
                    </a>
                </span> 
            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-700 text-slate-400">
            © 2026 Corporate Analytics Dashboard. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default LandingPage;
