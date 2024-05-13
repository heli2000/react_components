import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/calendar"}>Calendar</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default App;
