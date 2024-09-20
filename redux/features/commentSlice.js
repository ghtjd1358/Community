import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('/feature/fetchComments', async (id) => {
    const response = await axios.get(`/api/get/comments`, { params: { id } });
    return response.data;
})

export const fetchCommentsPost = createAsyncThunk('/feature/fetchCommentsPost', async (comments) => {
    console.log('슬라이스 댓글', comments)
    const response = await axios.post('/api/post/commentsPost', comments)
    console.log(response)
    return response.data
})

const initialState = {
    comments : [],
    loading : false,
    error : null
}

const commentsSlice = createSlice({
    name : 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload
        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(fetchCommentsPost.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchCommentsPost.fulfilled, (state, action) => {
            state.loading = false
            state.comments = [...state.comments, action.payload] 
        })
        .addCase(fetchCommentsPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default commentsSlice.reducer;
