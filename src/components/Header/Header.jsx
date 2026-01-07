import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Header() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  const initial = user.username.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-sm">
            {initial}
          </div>
          <span className="text-gray-900 text-sm font-medium">
            {user.username}
          </span>
        </div>

       <h1 className="text-xl font-semibold text-black tracking-tight">
  ApplyLog
</h1>

        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add-job"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Add Job
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;