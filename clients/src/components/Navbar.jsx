import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ backgroundColor: "#f59e0b !important" }}
      >
        <div className="container">
          <img
            src="./assets/hacktiv8-logo.png"
            alt="nav-logo"
            style={{ height: 40 }}
          />
          <div className="me-auto" />
          <ul className="navbar-nav mx-2 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/addCourse"} className="nav-link text-black">
                Add Course
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/mycourses"} className="nav-link text-black">
                My Course
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={logoutHandler} className="nav-link text-black">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
