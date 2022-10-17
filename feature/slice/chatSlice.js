import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const createChat = createAsyncThunk(
    "create/chat", async (form, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.data.userToken
        console.log(form)
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                   
                },
            }
            const url = "https://essential-dating-api.herokuapp.com/api/chat/create-chat"
        const response = await axios.post(url, form, config).catch(err => console.log(err.message))
            return response.data
        } catch (error) {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
       
    }
);



const initialState = {
    chat: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

}
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // login user
            .addCase(createChat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chat = action.payload;
            })
            .addCase(createChat.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.chat = {};
                state.message = action.payload;
            })
    }


})

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;