import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { firebaseConfig } from "../Secrets";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query,
  doc, getDocs, updateDoc, addDoc, deleteDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Gets the Lyrics that the user ahs selctecd to see in the voabulary review
export const getLyricsThunk = createAsyncThunk(
 'todofirebase/getItems',
  async () => {
    const initList = [];
    const collRef = collection(db, 'todos');
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((docSnapshot)=>{
      const todo = docSnapshot.data();
      todo.key = docSnapshot.id;
      initList.push(todo);
    });
    return initList;
  }
);
// Adds an individual lyric/vocab word to vocabulary review
export const addItemThunk = createAsyncThunk(
  'todothunks/addItem',
  async (todoText) => {
    const todoCollRef = collection(db, 'todos');
    const todoSnap = await addDoc(todoCollRef, {text: todoText});
    return {key: todoSnap.id, text: todoText};
  }
)
// Deletes an individual lyric/vocab word to vocabulary review
export const deleteItemThunk = createAsyncThunk(
  'todofirebase/deleteItem',
  async (todo) => {
    const docToDelete = collection(db, 'todos', todo.key);
    await deleteDoc(docToDelete);
    return todo
  }
)

// Updates when an individual lyric/vocab word appears based on time selection (May be in a different slice)
export const updateItemThunk = createAsyncThunk(
  'todofirebase/updateItem',
  async ({item, inputText}) => {
    const docToUpdate = collection(db, 'todos', item.key);
    await updateDoc(docToUpdate, {text: inputText});
    return {...item , text: inputText};
  }
)

export const todoSlice = createSlice({
  // Name to dispatch to reducer
  name: 'todos',
  initialState: {
    value: [],
  },
  
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(getTodosThunk.fulfilled, (state, action) => {
      state.value = action.payload
    })
    // The addItemThunk thunk we created has three "statuses", fulfilled, pending, and error.
    // We can use the builder to add a case that responds to each status. 
    // The "state" is the redux state, just as the reducers above use them.
    // action.payload is what the inner function in addItemThunk returns,
    // which in this case is our new todo item
    builder.addCase(addItemThunk.fulfilled, (state, action) => {
      state.value = [
        ...state.value,
        action.payload,
      ];
    });
    builder.addCase(deleteItemThunk.fulfilled, (state,action) => {

      const itemId = action.payload.key
      state.value = state.value.filter(elem=>elem.key !== itemId);
    });
    builder.addCase(updateItemThunk.fulfilled, (state, action) => {
      state.value = state.value.map(
        elem => elem.key === action.payload.key ? action.payload : elem
      )
    });
  }, 

})

export const { addItem, updateItem, deleteItem } = todoSlice.actions
export default todoSlice.reducer