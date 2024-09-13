const { configureStore } = require("@reduxjs/toolkit");
import forumReducer from './features/forumSlice'

const store = configureStore({
    reducer:{
        posts : forumReducer,
    }
})

export default store