import { createSlice } from '@reduxjs/toolkit';
import { rgba } from 'polished';

export interface Theme {
  primary: string;
  primary10: string;
  primary20: string;
  background: string;
  accent: string;
  secondary: string;
}

const initialState: Theme = {
  primary: '#42567a',
  primary10: rgba('#42567a', 0.1),
  primary20: rgba('#42567a', 0.2),
  background: '#F4F5F9',
  accent: '#3877EE',
  secondary: '#EF5DA8',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
});

export default themeSlice.reducer;
