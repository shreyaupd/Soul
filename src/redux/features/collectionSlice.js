import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    items: []
  },
  reducers: {
    //save and check for duplicacy
    addToCollection: (state, action) => {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    //unsave
    removeFromCollection: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToCollection, removeFromCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
