import reactlogo from "../assets/react.svg";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  const activeLink = ({ isActive }) =>
    isActive
      ? "bg-blue-700 bg-opacity-60 rounded px-3 py-2"
      : "hover:bg-blue-700 hover:bg-opacity-20 rounded px-3 py-2";

  return (
    <header>
      <div className="flex mr-auto gap-x-2 font-semibold text-2xl">
        <Link to="/">
          <img src={reactlogo} alt="React Logo"></img>
        </Link>
        React : Todo List
      </div>
      <ul className="hidden md:flex gap-x-6">
        <li>
          <NavLink to="/" className={activeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/DataHardware" className={activeLink}>
            DataHardware
          </NavLink>
        </li>
        <li>
          <NavLink to="/GraphHardware" className={activeLink}>
            GraphHardware
          </NavLink>
        </li>
        <li>
          <NavLink to="/Total" className={activeLink}>
            Total
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
