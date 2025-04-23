import { createSlice } from '@reduxjs/toolkit';

export interface Adaptive {
  mobile: string;
}

export const adaptiveSlice = createSlice({
  name: 'adaptive',
  initialState: {
    mobile: '430px',
  },
  reducers: undefined,
});

export default adaptiveSlice.reducer;
