import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../slice/userSlice"
import usersReducer from "../slice/users"
import chatReducer from "../slice/listchat"
import postReducer from "../slice/postSlice"
import newChatReducer from "../slice/chatSlice"
import storage from "redux-persist/lib/storage";
import {
    // persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const allReducer = combineReducers({


    auth: authReducer,
    users: usersReducer,
    chat: chatReducer,
    post: postReducer,
    newChat:newChatReducer




})
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "users", "chat"],
}; const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// export default the store 
export default store
