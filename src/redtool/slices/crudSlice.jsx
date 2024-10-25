import { createSlice } from "@reduxjs/toolkit";

const crudSlice = createSlice({
  name: "crud",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {
      const updatedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (updatedItem) {
        updatedItem.name = action.payload.name;
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = crudSlice.actions;

export default crudSlice.reducer;
