import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    Users: [],
    getAllUserIsLoading: false,
    deleteUserIsLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
};

export const getAllUser = createAsyncThunk(
    "admin/getAllUser",
    async (username) => {
        try {
            const { data } = await axios.get(`/api/user/get-all-user`);
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }
);
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId) => {
        try {
            await axios.delete(`/api/user/${userId}`);
            return userId;
        } catch (err) {
            console.log(err.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        resetUsers: (state) => {
            state.Users = [];
            state.getAllUserIsLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = null;
        },
    },
    extraReducers: {
        [getAllUser.pending]: (state) => {
            state.getAllUserIsLoading = true;
        },
        [getAllUser.fulfilled]: (state, action) => {
            state.getAllUserIsLoading = false;
            state.Users = action.payload;
        },
        [getAllUser.rejected]: (state) => {
            state.getAllUserIsLoading = false;
        },
    },
});

export const { resetUsers} =
    adminSlice.actions;

export default adminSlice.reducer;
