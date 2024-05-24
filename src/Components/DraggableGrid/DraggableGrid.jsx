import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { data as initialData, doctors as initialDoctors } from "./gridData";
import {
  Container,
  DoctorItem,
  DoctorList,
  GridContainer,
} from "./DraggableGridStyling";

const Doctor = ({ doctor, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "DOCTOR",
    drop: (item) => onDrop(item.doctor, item.task, "doctor"),
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
      {doctor && doctor.length
        ? doctor.map((obj) => {
            return obj.name + " ";
          })
        : "Not Assigned"}
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
        let obj = prevData.map((item) => {
          let itemObj = {};
          if (item.content === task && type === "doctor") {
            itemObj = { ...item, doctor: [] };
          } else if (item.content === task) {
            let docArr = item?.doctor?.filter((obj) => obj.id === doctor.id)
              .length
              ? [...item.doctor]
              : [...item.doctor, doctor];
            itemObj = { ...item, doctor: docArr };
          } else {
            itemObj = { ...item };
          }

          return itemObj;
          // return item.content === task && type === "doctor"
          //   ? { ...item, doctor: {} }
          //   : item.content === task
          //   ? { ...item, doctor: doctor }
          //   : item;
        });
        return obj;
      });

      // setData((prevData) =>
      //   prevData.map((item) =>
      //     item.content === task ? { ...item, doctor: doctor } : item
      //   )
      // );
    }

    // Remove the doctor from the doctor list
    // doctor && type == "doctor"
    //   ? setDoctors((prevDoctors) => {
    //       return prevDoctors.filter((d) => d.id == doctor.id).length
    //         ? prevDoctors
    //         : [...prevDoctors, doctor];
    //     })
    //   : doctor &&
    //     setDoctors((prevDoctors) =>
    //       prevDoctors.filter((d) => d.id !== doctor.id)
    //     );
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
