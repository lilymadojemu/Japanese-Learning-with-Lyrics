import { configureStore } from "@reduxjs/toolkit";
import lyrics from "../Features/lyricSlice";
import flashcards from "../Features/flashcardSlice";

export default configureStore({
  reducer: {
    lyrics,
    flashcards,
  }
});