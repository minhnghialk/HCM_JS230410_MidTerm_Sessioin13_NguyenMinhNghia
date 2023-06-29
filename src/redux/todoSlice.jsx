import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addToDo: (state, action) => {
      const newTask = action.payload;
      return [...state, newTask];
    },
    removeToDo: (state, action) => {
      const taskId = action.payload;
      return state.filter((task) => task.id !== taskId);
    },
    editToDo: (state, action) => {
      const { id, title } = action.payload;
      return state.map((task) => {
        if (task.id === id) {
          return { ...task, title };
        }
        return task;
      });
    },
    toggleToDo: (state, action) => {
      const taskId = action.payload;
      return state.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    },
  },
});

const { actions, reducer } = todoSlice;
export const { addToDo, removeToDo, editToDo, toggleToDo } = actions;
export default reducer;
