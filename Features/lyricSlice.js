import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Gets Lyrics from Genius API based on the song that the user has selected
export const getLyricsThunk = createAsyncThunk(
 'lyricfirebase/getLyrics',
  // Fetching lyrics from Spotify API based on song selection
  async () => {
    const initList = [];
    const collRef = collection(db, 'lyrics');
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((docSnapshot)=>{
      const todo = docSnapshot.data();
      todo.key = docSnapshot.id;
      initList.push(lyric);
    });
    return initList;
  }
);

export const lyricSlice = createSlice({
  // Name to dispatch to reducer
  name: 'lyrics',
  initialState: {
    value: [],
  },
  
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(getLyricsThunk.fulfilled, (state, action) => {
      state.value = action.payload
    });
  }, 

})

export default lyricSlice.reducer