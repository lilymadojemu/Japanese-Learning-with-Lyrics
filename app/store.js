
import {configureStore} from "@reduxjs/toolkit";
import lyrics from "../features/lyricSlice";
// Export result of configure store and pass into a reducer that contains "todos" reducer

export default configureStore({
  reducer: {
    lyrics
  },
})