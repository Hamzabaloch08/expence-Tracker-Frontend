import { createSlice } from "@reduxjs/toolkit";
import { getAllExpense, addExpenseThunk, deleteExpenseThunk } from "../expenseThunks/expenseThunks";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearExpenseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Expenses
    builder
      .addCase(getAllExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getAllExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Expense
    builder
      .addCase(addExpenseThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload);
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete Expense
    builder
      .addCase(deleteExpenseThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearExpenseError } = expenseSlice.actions;
export default expenseSlice.reducer;
