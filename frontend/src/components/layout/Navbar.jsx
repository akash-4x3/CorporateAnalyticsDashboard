import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartPie, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import ProfileModal from "./ProfileModal";
import { clearAuthStorage, getLoggedInUser } from "../../utils/authUtils";

function Navbar() {
  const { fullName, role } = getLoggedInUser();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {

    clearAuthStorage();

    toast.success("Logged out successfully");

    navigate("/login", { replace: true });
  };

  return (
    <>
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Corporate Analytics Dashboard
          </h1>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">


        <button
          onClick={() => setShowProfileModal(true)}
          className="text-right hover:bg-gray-200 rounded-xl px-3 py-1.5"
        >
          <h2 className="font-semibold text-blue-700">
            {fullName}
          </h2>

          <p className="text-sm text-blue-500">
            {role}
          </p>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </header>

    {
      showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )
    }
    </>
  );
}

export default Navbar;
