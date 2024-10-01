// blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://hojjangfe1358.tistory.com/rss'

export const fetchRssPosts = createAsyncThunk('blog/fetchRssPosts', async () => {
  const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
  return response.data
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRssPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRssPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchRssPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
