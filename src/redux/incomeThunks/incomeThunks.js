import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://expence-tracker-backend-rose.vercel.app/api";

export const addIncomeThunk = createAsyncThunk(
  "income/add",
  async ({ title, amount, source, date }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${BASE_URL}/income`,
        { title, amount, source, date },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add income",
      );
    }
  },
);

export const deleteIncomeThunk = createAsyncThunk(
  "income/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${BASE_URL}/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete income",
      );
    }
  },
);

export const getAllIncome = createAsyncThunk(
  "income/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${BASE_URL}/income`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch incomes",
      );
    }
  },
);
