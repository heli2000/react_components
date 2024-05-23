import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";

const GridRow = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 8px;
  margin-bottom: 4px;
  border: 1px solid lightgrey;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

export const DraggableRow = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <GridRow
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        style={provided.draggableProps.style}
      >
        <div>{task.content}</div>
        <div>{task.time}</div>
      </GridRow>
    )}
  </Draggable>
);
