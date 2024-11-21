import reactlogo from "../assets/react.svg";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <div className="flex mr-auto gap-x-2 font-semibold text-2xl">
        <img src={reactlogo} alt="React Logo"></img>
        React : Todo List
      </div>
      <ul className="hidden md:flex gap-x-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/DataHardware">DataHardware</Link>
        </li>
        <li>
          <Link to="/GraphHardware">GraphHardware</Link>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
