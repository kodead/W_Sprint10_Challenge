import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import sizeFilterReducer from './sizeFilterSlice'
import ordersReducer from './ordersSlice'


export const resetStore = () =>  configureStore({
  reducer: {
  [pizzaApi.reducerPath]: pizzaApi.reducer,
  sizeFilter: sizeFilterReducer,
  orders: ordersReducer,
  },  
  middleware: (getDefault) => getDefault().concat(pizzaApi.middleware),
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  devtools: process.env.NODE_ENV !== 'production',
});

export default resetStore;
