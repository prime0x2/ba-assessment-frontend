import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { register, login, loginWithGoogle, getGoogleUserInfo } from "./api";

export const registerUser = createAsyncThunk("userSlice/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await register(userData);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

export const loginUser = createAsyncThunk("userSlice/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await login(loginData);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

export const googleLogin = createAsyncThunk("userSlice/google-login", async (tokenResponse, { rejectWithValue }) => {
  try {
    const { access_token } = tokenResponse;
    const userInfo = await getGoogleUserInfo(access_token);

    const bodyData = {
      name: userInfo?.name,
      email: userInfo?.email,
      googleId: userInfo?.id,
    };
    const response = await loginWithGoogle(bodyData);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  preferences: {
    showStatusFilter: false,
    showDueDateFilter: true,
    showPriorityFilter: true,
    sortBy: "dueDate",
    sortOrder: "asc",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setShowStatusFilter: (state, action) => {
      state.preferences.showStatusFilter = action.payload;
    },
    setShowDueDateFilter: (state, action) => {
      state.preferences.showDueDateFilter = action.payload;
    },
    setShowPriorityFilter: (state, action) => {
      state.preferences.showPriorityFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.preferences.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.preferences.sortOrder = action.payload;
    },
    clearUserSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions for user authentication and preferences
export const {
  logout,
  setSortBy,
  setSortOrder,
  clearUserSlice,
  setShowStatusFilter,
  setShowDueDateFilter,
  setShowPriorityFilter,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
