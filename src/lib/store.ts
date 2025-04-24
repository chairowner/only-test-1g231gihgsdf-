import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { adaptiveSlice, themeSlice } from './features';

const reducer = combineSlices(themeSlice, adaptiveSlice);

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
