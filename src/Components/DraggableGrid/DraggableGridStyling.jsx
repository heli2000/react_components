import styled from "@emotion/styled/macro";

export const Container = styled("div")`
  display: flex;
  background-color: ${(props) =>
    props.isDraggingOver ? "#639ee2" : "inherit"};
`;

export const DoctorList = styled("div")`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const DoctorItem = styled("div")`
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e3f2fd;
  cursor: pointer;
  &:hover {
    background-color: #bbdefb;
  }
`;

export const GridContainer = styled("div")`
  flex-grow: 1;
`;
