import {
  FaChartPie,
  FaUsers,
  FaBuilding,
  FaUserShield,
  FaChartLine,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">

        <h1 className="text-xl font-bold text-blue-400">
          Corporate Analytics
        </h1>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          <li className="flex items-center gap-3 bg-blue-600 rounded-lg px-4 py-3 cursor-pointer">
            <FaChartPie />
            Dashboard
          </li>

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <FaUsers />
            Users
          </li>

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <FaBuilding />
            Departments
          </li>

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <FaUserShield />
            Roles
          </li>

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <FaChartLine />
            Performance
          </li>

        </ul>

      </nav>

      {/* User Info */}
      <div className="border-t border-slate-700 p-4">

        <h2 className="font-semibold">
          {localStorage.getItem("fullName")}
        </h2>

        <p className="text-sm text-slate-400">
          {localStorage.getItem("role")}
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;