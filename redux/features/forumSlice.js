import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 쓰기 요청
export const fetchCreate = createAsyncThunk('features/fetchCreate', async (writeForm) => {
    const response = await axios.post('/api/post/create', writeForm);
    const data = response.data;
    console.log('post 요청', data);
    return data; 
});

// 비동기 읽기 요청
export const fetchRead = createAsyncThunk('features/fetchRead', async (id) => {
    const response = await axios.get('/api/get/read');
    const data = response.data;
    return data; 
});

// 비동기 수정 요청
export const fetchUpdate = createAsyncThunk('features/fetchUpdate', async (writeForm) => {
    const response = await axios.patch('/api/patch/update', writeForm);
    const data = response.data;
    console.log('patch 요청', data);
    console.log('patch 폼', writeForm)
    return data; 
});

const initialState = {
    lists: [],  
    loading: false, 
    error: null 
};

const postSlice = createSlice({
    name: 'write',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create 요청 처리
            .addCase(fetchCreate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.lists = [...state.lists, action.payload];
            })
            .addCase(fetchCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Read 요청 처리
            .addCase(fetchRead.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRead.fulfilled, (state, action) => {
                state.loading = false;
                state.lists = action.payload;
            })
            .addCase(fetchRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update 요청 처리
            .addCase(fetchUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUpdate.fulfilled, (state, action) => {
                state.loading = false;
                const findData = state.lists.findIndex(item => item._id === action.payload._id )
                if(findData !== -1){
                    state.lists[findData] = action.payload;
                }
                
            })
            .addCase(fetchUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            
    }
});

export default postSlice.reducer;
