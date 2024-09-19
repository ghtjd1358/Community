import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('/feature/fetchComments', async ( comments ) => {
    const response = await axios.post('/api/post/comment', comments)
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
    reducers:{},
    extraReducers : (builder) => {

    }
}) 



export default commentsSlice.reducer





