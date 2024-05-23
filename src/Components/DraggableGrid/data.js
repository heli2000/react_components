export default {
  tasks: {
    "dr-1": { id: "dr-1", content: "Physician", time: "10:00AM - 12:00PM" },
    "dr-2": { id: "dr-2", content: "Cardiologist", time: "12:00PM - 05:00PM" },
    "dr-3": { id: "dr-3", content: "Dentist", time: "10:00AM - 12:00PM" },
    "dr-4": { id: "dr-4", content: "Dermatologist", time: "10:00AM - 12:00PM" },
    "dr-5": { id: "dr-5", content: "ENT", time: "09:00AM - 12:00PM" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "KD Hospital",
      taskIds: ["dr-1", "dr-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Bodyline",
      taskIds: ["dr-3", "dr-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Jivaraj Mehta",
      taskIds: ["dr-5"],
    },
  },
  // columnOrder: ["column-1", "column-2", "column-3"]
  columnOrder: ["column-1", "column-2", "column-3"],
};
