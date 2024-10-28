import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  size: '',
  toppings: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  },
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;  // No need for redundant if statement
    },
    setTopping: (state, action) => {
      const { field, value } = action.payload;
      state.toppings[field] = value;
    },
    resetForm: (state) => {
      state.fullName = '';
      state.size = '';
      state.toppings = initialState.toppings;  // Reset the toppings to initial state
    },
  },
});

export const { setField, setTopping, resetForm } = orderSlice.actions;
export default orderSlice.reducer;