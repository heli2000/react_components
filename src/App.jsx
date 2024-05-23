import { Link, Outlet } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  return (
    <PrimeReactProvider>
      <div>
        <ul>
          <li>
            <Link to={"/calendar"}>Calendar</Link>
          </li>
          <li>
            <Link to={"/draggable"}>Draggable</Link>
          </li>
          <li>
            <Link to={"/draggable-grid"}>Draggable Grid</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
