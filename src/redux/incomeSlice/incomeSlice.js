import { createSlice } from "@reduxjs/toolkit";
import { getAllIncome, addIncomeThunk, deleteIncomeThunk } from "../incomeThunks/incomeThunks";

export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearIncomeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Incomes
    builder
      .addCase(getAllIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(getAllIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Income
    builder
      .addCase(addIncomeThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(addIncomeThunk.fulfilled, (state, action) => {
        state.incomes.unshift(action.payload);
      })
      .addCase(addIncomeThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete Income
    builder
      .addCase(deleteIncomeThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteIncomeThunk.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter((i) => i._id !== action.payload);
      })
      .addCase(deleteIncomeThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearIncomeError } = incomeSlice.actions;
export default incomeSlice.reducer;
