import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const ListSinglchat = createAsyncThunk(
    "fetch/chat",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.data.userToken
        console.log(token)
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
            const response = await axios.get(`https://essential-dating-api.herokuapp.com/api/chat/${id}`, config).catch(err => console.log(err.message))
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
    name: "fetch",
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
            .addCase(ListSinglchat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ListSinglchat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chat = action.payload;
            })
            .addCase(ListSinglchat.rejected, (state, action) => {
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