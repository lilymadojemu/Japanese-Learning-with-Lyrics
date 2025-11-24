import { configureStore } from "@reduxjs/toolkit";
import lyrics from "../features/lyricSlice";
import flashcards from "../features/flashcardSlice";

export default configureStore({
  reducer: {
    lyrics,
    flashcards
  },
});