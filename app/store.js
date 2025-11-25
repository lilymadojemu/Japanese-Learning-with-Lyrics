import { configureStore } from "@reduxjs/toolkit";
import flashcards from "../Features/flashcardSlice";

export default configureStore({
  reducer: {
    flashcards,
  }
});