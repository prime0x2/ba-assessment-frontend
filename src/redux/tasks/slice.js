import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { create, getAll, getById, update, remove } from "./api";

export const createTask = createAsyncThunk("tasks/create", async ({ token, bodyData }, { rejectWithValue }) => {
  try {
    const response = await create(token, bodyData);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

export const getAllTasks = createAsyncThunk("tasks/getAll", async (token, { rejectWithValue }) => {
  try {
    const response = await getAll(token);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

export const getTaskById = createAsyncThunk("tasks/getById", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await getById(token, id);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

export const updateTask = createAsyncThunk("tasks/update", async ({ token, id, bodyData }, { rejectWithValue }) => {
  try {
    const response = await update(token, { id, bodyData });

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

export const deleteTask = createAsyncThunk("tasks/delete", async ({ token, bodyData }, { rejectWithValue }) => {
  try {
    const response = await remove(token, bodyData);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data || error.response);
  }
});

const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Task: Insert the task into the state directly without refetching
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add the new task to the tasks array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to create task";
      })

      // Get All Tasks: Populate the task list (used on initial load)
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch tasks";
      })

      // Get Task By Id: Fetch the task by ID and store it in the state

      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch task";
      })

      // Update Task: Find and update the task directly in the state
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update the task in the state
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to update task";
      })

      // Delete Task: Remove the task from the state directly
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => !action.meta.arg.ids.includes(task._id)); // Remove the task from the state
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to delete task";
      });
  },
});

export default tasksSlice.reducer;
