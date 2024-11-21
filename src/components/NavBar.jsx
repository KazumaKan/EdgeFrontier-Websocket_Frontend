import react from "../assets/react.svg"
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <div className="flex mr-auto gap-x-2 font-semibold text-2xl">
        <img src={react} alt="EdgeFrontier Logo"></img>
        EdgeFrontier : WebSocket
      </div>
      <ul className="hidden md:flex gap-x-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/DataHardware">Data Hardware</Link>
        </li>
        <li>
          <Link to="/GraphHardware">Graph Hardware</Link>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
