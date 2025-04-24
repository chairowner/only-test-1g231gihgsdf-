import { createSlice } from '@reduxjs/toolkit';
import { rgba } from 'polished';

export interface Theme {
  primary: string;
  primary10: string;
  primary20: string;
  primary50: string;
  background: string;
  accent: string;
  accent10: string;
  secondary: string;
  light: string;
}

const initialState: Theme = {
  primary: '#42567a',
  primary10: rgba('#42567a', 0.1),
  primary20: rgba('#42567a', 0.2),
  primary50: rgba('#42567a', 0.5),
  background: '#F4F5F9',
  accent: '#ee3838',
  accent10: rgba('#3877EE', 0.1),
  secondary: '#EF5DA8',
  light: '#ffffff',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: undefined,
});

export default themeSlice.reducer;
