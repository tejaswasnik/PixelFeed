import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../auth/hooks/useAuth";
import "./Navbar.scss";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => {
    if (path.startsWith("/profile")) {
      return location.pathname.startsWith("/profile");
    }
    return location.pathname === path;
  };

  return (
    <nav className="app-navbar" id="app-navbar">
      <Link to="/feed" className="navbar-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-name">PixelFeed</span>
      </Link>

      <div className="navbar-links">
        <Link
          to="/feed"
          className={`navbar-link ${isActive("/feed") ? "active" : ""}`}
          id="nav-feed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Feed</span>
        </Link>

        <Link
          to="/create"
          className={`navbar-link ${isActive("/create") ? "active" : ""}`}
          id="nav-create"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <line x1="12" x2="12" y1="8" y2="16" />
            <line x1="8" x2="16" y1="12" y2="12" />
          </svg>
          <span>Create</span>
        </Link>

        {user && (
          <Link
            to={`/profile/${user.username}`}
            className={`navbar-link profile-link ${isActive("/profile") ? "active" : ""}`}
            id="nav-profile"
          >
            <img
              src={user.profilePicture}
              alt={user.username}
              className="navbar-avatar"
            />
            <span>{user.username}</span>
          </Link>
        )}

        <button
          className="navbar-link logout-btn"
          onClick={handleLogout}
          id="nav-logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
