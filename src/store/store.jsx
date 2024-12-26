import itemsReducer, { filterReducer } from './reducer'; 
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    filter: filterReducer
  },
});

export default store;
