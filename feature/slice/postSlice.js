import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const createpost = createAsyncThunk(
    "create/post",
    async (form, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.data.userToken
        console.log(token)
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
            const response = await axios.post("https://essential-dating-api.herokuapp.com/api/posts/new", form, config)
                .catch(err => console.log(err.message))
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
    post: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

}
const postSlice = createSlice({
    name: "post",
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
            .addCase(createpost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createpost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.post = action.payload;
            })
            .addCase(createpost.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.post = null;
                state.message = action.payload;
            })
    }


})

export const { reset } = postSlice.actions;
export default postSlice.reducer;