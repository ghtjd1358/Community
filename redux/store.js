const { configureStore } = require("@reduxjs/toolkit");
import commentReducer from './features/commentSlice';
import forumReducer from './features/forumSlice'
import registerReducer from './features/registerSlice';



const store = configureStore({
    reducer:{
        posts : forumReducer,
        register : registerReducer,
        comment : commentReducer,

    }
})

export default store