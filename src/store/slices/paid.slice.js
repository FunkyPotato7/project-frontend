import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { paidService } from "../../services";

const initialState = {
    paids: [],
    updatedPaid: null,
    statistic: [],
    totalCount: 0,
    currentPage: 1,
    countOnPage: 1,
    isLoading: false,
    error: false,
    index: 0
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

const getStatistic = createAsyncThunk(
    "paidSlice/getStatistic",
    async (_, {rejectedWithValue}) => {
        try {
            const { data } = await paidService.statistic();
            return data
        } catch (e) {
            return rejectedWithValue(e.response.data);
        }
    }
);

const update = createAsyncThunk(
    "paidSlice/update",
    async (data, {rejectedWithValue}) => {
        const { id, info } = data
        try {
            const { data } = await paidService.update(id, info);
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
                state.paids = action.payload.data;
                state.totalCount = action.payload.total_count;
                state.currentPage = action.payload.page;
                state.countOnPage = action.payload.count_on_page;
                state.index = (((state.countOnPage * state.currentPage) - state.countOnPage) + 1);
                state.paids.map((paid) => paid.id = state.index++);
                state.isLoading = false;
                state.error = false;
            })
            .addCase(getAll.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(getStatistic.fulfilled, (state, action) => {
                state.statistic = action.payload;
                state.error = false;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.updatedPaid = action.payload;
                state.isLoading = false;
                state.error = false;
            })
});

const {reducer: paidReducer} = paidSlice;

const paidActions = {
    getAll,
    getStatistic,
    update
};

export {
    paidActions,
    paidReducer
};
