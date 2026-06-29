import { FaTimes } from "react-icons/fa";
import { getLoggedInUser } from "../../utils/authUtils";

function ProfileModal({ onClose }) {

  const { fullName, email, role } = getLoggedInUser();

  const profileInitial = fullName ? fullName.charAt(0).toUpperCase() : "U";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
      >

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col items-center text-center">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
            {profileInitial}
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-800">
            {fullName}
          </h2>

          <p className="mt-2 text-slate-500">
            {email}
          </p>

          <div className="mt-5 bg-blue-50 text-blue-700 px-5 py-2 rounded-full font-semibold">
            {role}
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileModal;
