import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <h1>Connect Four</h1>
      <Link className="link" to="/vs-cpu">
        Player vs CPU (pieces counting)
      </Link>
      <Link className="link" to="/vs-cpu2">
        Player vs CPU2 (positions)
      </Link>
      <Link className="link" to="/cpu-vs-cpu">
        CPU vs CPU
      </Link>
    </div>
  );
};

export default Menu;
