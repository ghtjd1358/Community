import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegister = createAsyncThunk(
  'register/register',
  async (registerForm, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/signup', registerForm);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

const initialState = {
  user: null, 
  loading: false,
  error: null
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  }
});

export default registerSlice.reducer;