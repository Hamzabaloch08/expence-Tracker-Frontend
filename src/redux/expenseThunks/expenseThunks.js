import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://expence-tracker-backend-rose.vercel.app/api";

export const addExpenseThunk = createAsyncThunk(
  "expense/add",
  async ({ title, amount, category, date }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${BASE_URL}/expense`,
        { title, amount, category, date },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add expense",
      );
    }
  },
);

export const deleteExpenseThunk = createAsyncThunk(
  "expense/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${BASE_URL}/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete expense",
      );
    }
  },
);

export const getAllExpense = createAsyncThunk(
  "expense/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${BASE_URL}/expense`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch expenses",
      );
    }
  },
);
