import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './features/commentSlice';
import forumReducer from './features/forumSlice';
import registerReducer from './features/registerSlice';
import { searchApi } from './features/searchSlice';
import blogReducer from './features/blogSlice';


const store = configureStore({
    reducer: {
        posts: forumReducer,
        register: registerReducer,
        comment: commentReducer,
        blog : blogReducer,
        [searchApi.reducerPath]: searchApi.reducer, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(searchApi.middleware) 
});

export default store;
