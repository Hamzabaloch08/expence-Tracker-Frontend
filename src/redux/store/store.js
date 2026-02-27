import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice/authSlice";
import expenseReducer from "../expenseSlice/expenseSlice";
import incomeReducer from "../incomeSlice/incomeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    income: incomeReducer,
  },
});
