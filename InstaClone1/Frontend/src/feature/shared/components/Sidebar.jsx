import { Link, useLocation } from "react-router";
import "../sidebar.scss";

const Sidebar = ({ user }) => {
  const location = useLocation();

  return (
    <aside className="sidebar">

      {/* TOP */}
      <div className="sidebar-top">

        <nav>
          <Link to="/feed" className={location.pathname === "/" ? "active" : ""}>
            <i className="ri-home-5-line"></i>
            <span>Home</span>
          </Link>

          <Link to="/create-post" className={location.pathname === "/create" ? "active" : ""}>
            <i className="ri-add-box-line"></i>
            <span>Create</span>
          </Link>
        </nav>
      </div>

      {/* BOTTOM PROFILE (desktop + tablet) */}
      <div className="sidebar-bottom">

        <Link to={`/get-me`}>
          <img src={user?.profilePic} alt="" />
          <span>{user?.username}</span>
        </Link>
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          <i className="ri-home-5-line"></i>
        </Link>

        <Link to="/create" className={location.pathname === "/create" ? "active" : ""}>
          <i className="ri-add-box-line"></i>
        </Link>
        <Link to={'/message'}>
        <i class="ri-send-ins-line"></i>
        </Link>
        <Link to={`/profile/${user?.username}`} className={location.pathname.includes("/profile") ? "active" : ""}>
          <i className="ri-user-line"></i>
        </Link>
      </div>

    </aside>
  );
};

export default Sidebar;