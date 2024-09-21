import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './features/commentSlice';
import forumReducer from './features/forumSlice';
import registerReducer from './features/registerSlice';
import { searchApi } from './features/searchSlice';

const store = configureStore({
    reducer: {
        posts: forumReducer,
        register: registerReducer,
        comment: commentReducer,
        [searchApi.reducerPath]: searchApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(searchApi.middleware), 
});

export default store;
