import { configureStore } from "@reduxjs/toolkit";
import todo from "../redux/todoSlice";

const store = configureStore({
  reducer: {
    todo: todo,
  },
});
export default store;
