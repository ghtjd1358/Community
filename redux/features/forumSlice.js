import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 쓰기 요청
export const fetchCreate = createAsyncThunk('features/fetchCreate', async (writeForm, {getState}) => {
    const response = await axios.post('/api/post/create', writeForm);
    return response.data;
});

// 비동기 읽기 요청
export const fetchRead = createAsyncThunk('features/fetchRead', async () => {
    const response = await axios.get('/api/get/read');
    return response.data;
});

// 비동기 수정 요청
export const fetchUpdate = createAsyncThunk('features/fetchUpdate', async (writeForm) => {
    const response = await axios.patch('/api/patch/update', writeForm);
    return response.data; 
});

// 비동기 삭제 요청
export const fetchDelete = createAsyncThunk('features/fetchDelete', async (id) => {
    const response = await axios.delete(`/api/delete/delete`, {data : {_id : id}});
    const data = response.data;
    console.log(data)
    return id; 
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
            })

              // Delete 요청 처리
            .addCase(fetchDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDelete.fulfilled, (state, action) => {
                state.loading = false;
                const findData = state.lists.filter(item => item._id !== action.payload)
                console.log('찾는 데이터', findData)
                console.log('찾는 아이디', action.payload)
                state.lists = findData;
            })
            .addCase(fetchDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            
    }
});

export default postSlice.reducer;
