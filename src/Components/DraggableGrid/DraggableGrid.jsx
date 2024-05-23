import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { data as initialData, doctors as initialDoctors } from "./gridData";
import styled from "@emotion/styled/macro";

const Container = styled("div")`
  display: flex;
  background-color: ${(props) =>
    props.isDraggingOver ? "#639ee2" : "inherit"};
`;

const DoctorList = styled("div")`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const DoctorItem = styled("div")`
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

const GridContainer = styled("div")`
  flex-grow: 1;
`;

const Doctor = ({ doctor, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "DOCTOR",
    drop: (item) => onDrop(item.doctor, item.task, "doctor"), // Null task means drop to doctor list
  }));

  const [, drag] = useDrag(() => ({
    type: "DOCTOR",
    item: { doctor },
  }));

  return (
    <DoctorItem ref={(node) => drag(drop(node))}>
      {doctor.name ? doctor.name : "No Doctors Available"}
    </DoctorItem>
  );
};

const DroppableCell = ({ task, onDrop, doctor, rowData }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "DOCTOR",
    drop: (item) => onDrop(item.doctor, task, null),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [, drag] = useDrag(
    () => ({
      type: "DOCTOR",
      item: { doctor, task },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [doctor]
  );

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      style={{
        border: `1px solid ${isOver ? "#639ee2" : "#ccc"}`,
        padding: "10px",
        backgroundColor: isOver ? "#f0f8ff" : "#ffffff",
      }}
    >
      {doctor && doctor.hasOwnProperty("name") ? doctor.name : "Not Assigned"}
    </div>
  );
};

const DraggableGrid = () => {
  const [data, setData] = useState(initialData);
  const [doctors, setDoctors] = useState(initialDoctors);

  const handleDrop = (doctor, task, type = "") => {
    if (task) {
      // Update the grid data to assign the doctor to the task
      setData((prevData) => {
        let obj = prevData.map((item) =>
          (item.content === task && type == "doctor") ||
          item.doctor.id === doctor.id
            ? { ...item, doctor: {} }
            : item.content === task
            ? { ...item, doctor: doctor }
            : item
        );
        return obj;
      });
    }

    // Remove the doctor from the doctor list
    doctor && type == "doctor"
      ? setDoctors((prevDoctors) => {
          return prevDoctors.filter((d) => d.id == doctor.id).length
            ? prevDoctors
            : [...prevDoctors, doctor];
        })
      : doctor &&
        setDoctors((prevDoctors) =>
          prevDoctors.filter((d) => d.id !== doctor.id)
        );
  };

  return (
    <Container>
      <DoctorList>
        {doctors && doctors.length ? (
          doctors.map((obj) => (
            <Doctor key={obj.id} doctor={obj} onDrop={handleDrop} />
          ))
        ) : (
          <Doctor key={"doctor_list"} doctor={{}} onDrop={handleDrop} />
        )}
      </DoctorList>
      <GridContainer>
        <DataTable value={data}>
          <Column
            field="doctor"
            header="Doctor"
            body={(rowData) => (
              <DroppableCell
                id={rowData.id}
                task={rowData.content}
                onDrop={handleDrop}
                doctor={rowData.doctor}
                rowData={rowData}
              />
            )}
          />
          <Column field="content" header="Task"></Column>
          <Column field="time" header="Time"></Column>
        </DataTable>
      </GridContainer>
    </Container>
  );
};

export default DraggableGrid;
