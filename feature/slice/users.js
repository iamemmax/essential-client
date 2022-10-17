import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const ListAllusers = createAsyncThunk(
    "fetch/users", async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.data.userToken
       console.log(token)
        try {
        const response = await axios.get("https://essential-dating-api.herokuapp.com/api/users", {headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }}
            
            ).catch(err => console.log(err.message))
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
    users: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

}
const userSlice = createSlice({
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
            .addCase(ListAllusers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ListAllusers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(ListAllusers.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.users = {};
                state.message = action.payload;
            })
    }


})

export const { reset } = userSlice.actions;
export default userSlice.reducer;