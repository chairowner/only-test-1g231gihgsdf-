import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './features';

const reducer = combineSlices(themeSlice);

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
