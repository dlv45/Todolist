import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../apis/taskApis";
import { message } from "antd";

const initialState = {
  isLoading: false,
  tasks: [],
  //tạo biến currentTask để lưu task đang edit
  currentTask: {},
  errors: {},
  //tạo thêm state để xử lý pagination
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 8,
  },
  searchKey: "",
};

export const actFetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    const task = await TaskAPIs.getTaskById(taskId);
    return task;
  }
);

//thêm param vào fetchAllTask để xử lý phân trang và search
//initial = {} khi không truyền params
export const actFetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async (params = {}) => {
    const response = await TaskAPIs.getAllTasks(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const actUpdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, taskUpdate }) => {
    await TaskAPIs.updateTaskById(id, taskUpdate);
    //phần này mình không xử lí kết quả trả về nên có thể để return null
    return null;
  }
);
export const actCreateNewTask = createAsyncThunk(
  "tasks/createNewTask",
  async (task) => {
    await TaskAPIs.createTask(task);
  }
);
export const actDeleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id) => {
    await TaskAPIs.deleteTaskById(id);

    return null;
    //phần này mình không xử lí kết quả trả về nên có thể để return null
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetCurrentTask: (state, action) => {
      state.currentTask = {};
    },
    setNewPage: (state, action) => {
      state.pagination = { ...state.pagination, currentPage: action.payload };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.isLoading = false;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
      message.success("Update Task Thành Công!!");
    });
    builder.addCase(actCreateNewTask.fulfilled, (state, action) => {
      message.success("Thêm task thành công!!");
    });
    builder.addCase(actDeleteTaskById.fulfilled, (state, action) => {
      message.success("Xóa Task Thành Công!!");
    });
  },
});

// export const actCreateNewTask = (task) => {
//   return async (dispatch) => {
//     await TaskAPIs.createTask(task);
//     dispatch(actFetchAllTask());

//     try {
//     } catch (error) {}
//   };
// };

export const { actSetTasks, setLoading, setNewPage, setSearchKey } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
