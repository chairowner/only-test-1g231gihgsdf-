import { createSlice } from '@reduxjs/toolkit';

export interface Adaptive {
  $mobile: string;
  $tablet: string;
}

const initialState: Adaptive = {
  $mobile: '768px',
  $tablet: '1490px',
};

export const adaptiveSlice = createSlice({
  name: 'adaptive',
  initialState,
  reducers: undefined,
});

export default adaptiveSlice.reducer;
