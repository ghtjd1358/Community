// blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRssPosts = createAsyncThunk('blog/fetchRssPosts', async () => {
  const response = await axios.get('/api/rss');
  const parser = new DOMParser();
  const xml = parser.parseFromString(response.data, 'text/xml');
  const items = xml.getElementsByTagName('item');

  return Array.from(items).map(item => ({
    title: item.getElementsByTagName('title')[0]?.textContent || 'No title',
    link: item.getElementsByTagName('link')[0]?.textContent || '#',
    pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || 'No date',
  }));
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
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
