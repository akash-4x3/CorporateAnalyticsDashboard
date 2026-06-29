import { FaBell, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const fullName = localStorage.getItem("fullName");
  const role = localStorage.getItem("role");

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="text-slate-600 hover:text-blue-600 transition">
          <FaBell size={20} />
        </button>

        <div className="text-right">
          <h2 className="font-semibold text-slate-800">
            {fullName}
          </h2>

          <p className="text-sm text-slate-500">
            {role}
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;