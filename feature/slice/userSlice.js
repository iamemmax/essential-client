import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const LoginUser = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            const response = await axios.post("https://essential-dating-api.herokuapp.com/api/users/login", user).catch(err => console.log(err.message))
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
        finally {

        }
    }
);



const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

}
const authSlice = createSlice({
    name: "auth",
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
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
    }


})

export const { reset } = authSlice.actions;
export default authSlice.reducer;