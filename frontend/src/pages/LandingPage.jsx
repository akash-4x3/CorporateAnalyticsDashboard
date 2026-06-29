import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();
    return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">

        <h1 className="text-2xl font-bold text-blue-600">
          Corporate Analytics
        </h1>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-10 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">

              Role-Based

              <span className="text-blue-600">
                {" "}Corporate{" "}
              </span>

              Analytics Dashboard

            </h1>

            <p className="mt-8 text-xl text-slate-600">

              Monitor employee performance,
              visualize business analytics,
              and make data-driven decisions
              with an enterprise-grade dashboard.

            </p>

            <button
                onClick={() => navigate("/login")}
                className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
                >
                Get Started
            </button>

          </div>

          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-10">

              <div className="h-72 rounded-2xl bg-linear-to-br from-blue-100 to-slate-100 flex items-center justify-center">

                <h2 className="text-3xl font-bold text-slate-500">
                  Dashboard Preview
                </h2>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default LandingPage;