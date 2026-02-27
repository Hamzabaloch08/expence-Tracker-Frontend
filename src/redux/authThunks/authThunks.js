import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://expence-tracker-backend-rose.vercel.app/api";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  },
);

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        fullName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Signup failed",
      );
    }
  },
);

export const checkToken = createAsyncThunk(
  "auth/check",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { user: response.data, token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Auth check Failed",
      );
    }
  },
);
