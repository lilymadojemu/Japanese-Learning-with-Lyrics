import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { firebaseConfig } from "../Secrets";
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query,
  doc, 
  getDocs, 
  updateDoc, 
  addDoc, 
  deleteDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FETCH all flashcards
export const getFlashcardsThunk = createAsyncThunk(
  'flashcards/getFlashcards',
  async () => {
    const initList = [];
    const collRef = collection(db, 'flashcards');
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((docSnapshot) => {
      const flashcard = docSnapshot.data();
      flashcard.key = docSnapshot.id;
      initList.push(flashcard);
    });

    return initList;
  }
);

// Add a flashcard
export const addFlashcardThunk = createAsyncThunk(
  'flashcards/addFlashcard',
  async (flashcardText) => {
    const timeStamp = Date.now();
    const collRef = collection(db, 'flashcards');
    const snap = await addDoc(collRef, { 
      text: flashcardText,
      time: timeStamp,
      suspendedUntil: null
    });

    return { 
      key: snap.id, 
      text: flashcardText,
      time: timeStamp,
      suspendedUntil: null
    };
  }
);

// SUSPEND a flashcard (hide 24hrs)
export const suspendFlashcardThunk = createAsyncThunk(
  'flashcards/suspendFlashcard',
  async (flashcard) => {
    const docRef = doc(db, 'flashcards', flashcard.key);
    const suspendUntil = Date.now() + 24 * 60 * 60 * 1000; // 24h

    await updateDoc(docRef, { suspendedUntil: suspendUntil });

    return { ...flashcard, suspendedUntil };
  }
);

// DELETE a flashcard permanently
export const deleteFlashcardThunk = createAsyncThunk(
  'flashcards/deleteFlashcard',
  async (flashcard) => {
    const docRef = doc(db, 'flashcards', flashcard.key);
    await deleteDoc(docRef);
    return flashcard;
  }
);

// UPDATE a flashcard's review interval
export const updateFlashcardThunk = createAsyncThunk(
  'flashcards/updateFlashcard',
  async ({ item, timeSelect }) => {
    const docRef = doc(db, 'flashcards', item.key);
    await updateDoc(docRef, { time: timeSelect });
    return { ...item, time: timeSelect };
  }
);

export const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState: {
    value: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFlashcardsThunk.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(addFlashcardThunk.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(suspendFlashcardThunk.fulfilled, (state, action) => {
        state.value = state.value.map(
          elem => elem.key === action.payload.key ? action.payload : elem
        );
      })
      .addCase(deleteFlashcardThunk.fulfilled, (state, action) => {
        state.value = state.value.filter(elem => elem.key !== action.payload.key);
      })
      .addCase(updateFlashcardThunk.fulfilled, (state, action) => {
        state.value = state.value.map(
          elem => elem.key === action.payload.key ? action.payload : elem
        );
      });
  }
});

export default flashcardSlice.reducer;