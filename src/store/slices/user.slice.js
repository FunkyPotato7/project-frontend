import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminService, userService } from "../../services";

const initialState = {
    users: [],
    user: null,
    actionToken: null,
    error: null
};

const getAll = createAsyncThunk(
    "userSlice/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const { data } = await adminService.getAll();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const getAuthUser = createAsyncThunk(
    "userSlice/getAuthUser",
    async (_, {rejectWithValue}) => {
        try {
            const { data } = await userService.getAuthUser();
            return data
        } catch (e) {
           return rejectWithValue(e.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        getUser:(state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
});

const {reducer: userReducer, actions: {getUser}} = userSlice;

const userActions = {
    getAll,
    getUser,
    getAuthUser
};

export {
    userReducer,
    userActions
};