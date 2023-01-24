import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {paidService} from "../../services";

const initialState = {
    paid: [],
    totalCount: 0,
    currentPage: 1
};

const getAll = createAsyncThunk(
    "paidSlice/getAll",
    async (query, {rejectedWithValue}) => {
        try {
            const { data } = await paidService.getAll(query);
            return data
        } catch (e) {
            return rejectedWithValue(e.response.data);
        }
    }
);


const paidSlice = createSlice({
    name: 'paidSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.paid = action.payload.data;
                state.paid.map((paid, index) => paid.id = index);
                state.totalCount = action.payload.total_count;
                state.currentPage = action.payload.page;
            })
});

const {reducer: paidReducer} = paidSlice;

const paidActions = {
    getAll
};

export {
    paidActions,
    paidReducer
}
