import {
  FaChartPie,
  FaUsers,
  FaBuilding,
  FaUserShield,
  FaChartLine,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileModal from "./ProfileModal";
import {
  ROLES,
  clearAuthStorage,
  getLoggedInUser,
  hasAnyRole,
  isAdmin
} from "../../utils/authUtils";

function Sidebar() {
  const navigate = useNavigate();
  const { fullName, role } = getLoggedInUser();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {

    clearAuthStorage();

    toast.success("Logged out successfully");

    navigate("/login", { replace: true });
  };

  return (
    <>
    <aside className="w-64 bg-slate-900 text-white flex flex-col">

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-slate-800"
                    }`
                }
            >
                <FaChartPie />
                <span>Dashboard</span>
            </NavLink>
          </li>

          {
          isAdmin() && (

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-slate-800"
                    }`
                }
            >
                <FaUsers />
                <span>Users</span>
            </NavLink>
          </li>

          )
          }

          {
          isAdmin() && (

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <NavLink
                to="/dashboard/departments"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-slate-800"
                    }`
                }
            >
                <FaBuilding />
                <span>Departments</span>
            </NavLink>
          </li>

          )
          }

          {
          isAdmin() && (

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <NavLink
                to="/dashboard/roles"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-slate-800"
                    }`
                }
            >
                <FaUserShield />
                <span>Roles</span>
            </NavLink>
          </li>

          )
          }

          {
          hasAnyRole([ROLES.ADMIN, ROLES.MANAGER]) && (

          <li className="flex items-center gap-3 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer transition">
            <NavLink
                to="/dashboard/performance"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-slate-800"
                    }`
                }
            >
                <FaChartLine />
                <span>Performance</span>
            </NavLink>
          </li>

          )
          }

        </ul>

      </nav>

      {/* User Info */}
      <div className="border-t border-slate-700 p-4">

        <h2 className="font-semibold">
          {fullName}
        </h2>

        <p className="text-sm text-slate-400">
          {role}
        </p>

        <div className="mt-4 space-y-2">

          <button
              onClick={() => setShowProfileModal(true)}
              className="w-full flex items-center gap-3 text-left text-slate-200 hover:bg-slate-800 rounded-xl px-4 py-3 transition"
          >
              <FaUserCircle />
              <span>Profile</span>
          </button>

          <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-left bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-3 transition"
          >
              <FaSignOutAlt />
              <span>Logout</span>
          </button>

        </div>

      </div>

    </aside>

    {
      showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )
    }
    </>
  );
}

export default Sidebar;
