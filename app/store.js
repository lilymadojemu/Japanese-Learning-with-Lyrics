
import {configureStore} from "@reduxjs/toolkit";
import todos from "../features/todoSlice";
// Export result of configure store and pass into a reducer that contains "todos" reducer

export default configureStore({
  reducer: {
    todos
  },
})