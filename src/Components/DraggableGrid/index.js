import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableGrid from "./DraggableGrid";

const GridDNDProvider = () => (
  <DndProvider backend={HTML5Backend}>
    <DraggableGrid />
  </DndProvider>
);

export default GridDNDProvider;
