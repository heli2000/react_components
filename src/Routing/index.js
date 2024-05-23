import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Calendar from "../Components/Calendar";
import GridDNDProvider from "../Components/DraggableGrid";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="calendar" element={<Calendar />} />
          <Route path="draggable-grid" element={<GridDNDProvider />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
