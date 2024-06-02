// slices/TodoSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllTodos, getData, fetchAllTodoLists } from "../services/http";
import { getUserID } from "../services/auth";
import { getItem, setItem } from "../services/storage";

// Function to get the current date as a string (e.g., "yyyy-mm-dd")
const getCurrentDateString = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Load staffStuff from AsyncStorage on Redux initialization
// const loadStaffStuffFromStorage = async () => {
//   const currentDate = getCurrentDateString();
//   const storedDate = await getItem("localStorageDate");

//   if (!storedDate || storedDate !== currentDate) {
//     // Clear staffStuff data in AsyncStorage and update the stored date
//     await setItem("staffStuff", { food: [] });
//     await setItem("localStorageDate", currentDate);
//   }

//   // Return staffStuff from AsyncStorage
//   const storedStaffStuff = await getItem("staffStuff");
//   return storedStaffStuff ? storedStaffStuff : { food: [] };
// };

// Save staffStuff to AsyncStorage
const saveStaffStuffToStorage = async (staffStuff) => {
  await setItem("staffStuff", staffStuff);
};

const getDefaultList = () => {
  return {
    PK: "",
    SK: "",
    list_id: "default",
    list_title: "To Do (private)",
    list_shared_with: [],
    list_date_created: "",
  };
};

// Async action using createAsyncThunk
export const fetchAllLists = createAsyncThunk(
  "api/fetch-all-lists",
  async (_, { rejectWithValue }) => {
    const user_id = await getUserID();
    try {
      const response = await fetchAllTodoLists(user_id);
      const myLists = [getDefaultList(), ...response.personalLists];
      return {
        myLists,
        sharedLists: response.sharedLists,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTodo = createAsyncThunk(
  "api/todo",
  async ({ list_id, user_id }) => {
    const pk = "TODOS#";
    const sk = `USER#${user_id}#${list_id}`; // Incorporate list_id into SK
    const begin_with = true;
    const table_name = "ZM_TODO";

    const resp = await getData(pk, sk, begin_with, table_name);
    return resp.Items;
  }
);

export const fetchBrainDump = createAsyncThunk("api/braindump", async () => {
  const user_id = await getUserID();
  const pk = "TODOS#";
  const sk = `BRAINDUMP#${user_id}`;
  const begin_with = false;
  const table_name = "ZM_TODO";
  const resp = await getData(pk, sk, begin_with, table_name);

  if (!resp.Items || resp.Items.length === 0 || !resp.Items[0].brain_dump) {
    throw new Error("No brain dump data found");
  }

  return resp.Items[0].brain_dump;
});

export const fetchAllTodosForAllLists = createAsyncThunk(
  "api/all-lists-todos",
  async () => {
    const user_id = await getUserID();
    const all_todos = await fetchAllTodos(user_id);
    return all_todos;
  }
);

const initialState = {
  allListsTodos: [],
  allTodos: [],
  currentFilter: "All",
  allLists: [],
  sharedLists: [],
  addNewTask: false,
  isLoading: false,
  selectedList: getDefaultList(),
  staffStuff: {},
  brainDump: "",
  editingList: false,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAddNewTask: (state, action) => {
      state.addNewTask = action.payload;
    },
    setAllTodo: (state, action) => {
      state.allTodos = action.payload;
    },
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
      state.selectedList = {
        PK: "",
        SK: "",
        list_id: "",
        list_title: "",
        list_shared_with: [],
        list_date_created: "",
      };
      state.allTodos = [...state.allListsTodos];
      state.addNewTask = false;
    },
    removeItems: (state, action) => {
      state.allTodos = state.allTodos.filter(
        (data) => data.id !== action.payload
      );
      state.allListsTodos = state.allTodos.filter(
        (data) => data.id !== action.payload
      );
    },
    selectItem: (state, action) => {
      state.allTodos = state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.status === "process") {
            return {
              ...item,
              status: action.payload.status,
              badgeclass: action.payload.badgeclass,
              badge: "Process",
            };
          } else if (action.payload.status === "completed") {
            return {
              ...item,
              status: action.payload.status,
              badgeclass: action.payload.badgeclass,
              badge: "Done",
            };
          }
        }
        return item;
      });
    },
    addNewTodo: (state, action) => {
      const newTodo = { ...action.payload };
      state.allTodos = [newTodo, ...state.allTodos];
      state.isLoading = false;
      state.addNewTask = false;
    },
    updateTodo: (state, action) => {
      const updatedTodo = { ...action.payload };
      state.allTodos = state.allTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      state.isLoading = false;
      state.addNewTask = false;
    },
    addNewList: (state, action) => {
      const newList = { ...action.payload };
      state.allLists = [...state.allLists, newList];
      state.isLoading = false;
    },
    updateList: (state, action) => {
      let all_lists = [...state.allLists];
      const foundIndex = all_lists.findIndex(
        (item) => item.list_id === action.payload.list_id
      );

      if (foundIndex !== -1) {
        let foundItem = { ...all_lists[foundIndex], ...action.payload };
        all_lists[foundIndex] = foundItem;
        state.allLists = all_lists;
        state.selectedList = foundItem;
      } else {
        console.warn("Item not found in allLists");
      }
    },
    markTaskAsCompleted: (state, action) => {
      let all_todos = [...state.allTodos];
      const foundIndex = all_todos.findIndex(
        (item) => item.id === action.payload
      );

      if (foundIndex !== -1) {
        const foundItem = { ...all_todos[foundIndex] };
        const newStatus =
          foundItem.status === "process" ? "completed" : "process";
        const newBadge = newStatus === "completed" ? "Done" : "Process";
        const newBadgeClass = newStatus === "completed" ? "success" : "danger";

        foundItem.status = newStatus;
        foundItem.badge = newBadge;
        foundItem.badgeclass = newBadgeClass;

        all_todos[foundIndex] = foundItem;

        return {
          ...state,
          allTodos: all_todos,
        };
      }

      return state; // Return current state if item is not found
    },

    updateTodoData: (state, action) => {
      const { id, key, value } = action.payload;
      let all_todos = [...state.allListsTodos];
      const foundIndex = all_todos.findIndex((item) => item.id === id);

      if (foundIndex !== -1) {
        const foundItem = { ...all_todos[foundIndex] };
        if ("starred" === key) {
          foundItem.starred = value;
        } else if ("shared_with" === key) {
          foundItem.shared_width = value;
        } else if ("status" === key) {
          const newStatus =
            foundItem.status === "process" ? "completed" : "process";
          const newBadge = newStatus === "completed" ? "Done" : "Process";
          const newBadgeClass =
            newStatus === "completed" ? "success" : "danger";

          foundItem.status = newStatus;
          foundItem.badge = newBadge;
          foundItem.badgeclass = newBadgeClass;
        }
        all_todos[foundIndex] = foundItem;

        return {
          ...state,
          allListsTodos: all_todos,
          allTodos: all_todos.filter(
            (todo) => todo.todo_list_id === state.selectedList.list_id
          ),
        };
      }
      return state;
    },

    changeTodoList: (state, action) => {
      state.selectedList = action.payload;
      const list_todos = state.allListsTodos.filter(
        (todo) => todo.todo_list_id === action.payload.list_id
      );
      state.allTodos = [...list_todos];
      state.addNewTask = false;
      state.currentFilter = "";
    },

    shareSelectedList: (state, action) => {
      return {
        ...state,
        selectedList: {
          ...state.selectedList,
          list_shared_with: action.payload,
        },
      };
    },
    removeSelectedList: (state) => {
      state.allLists = state.allLists.filter(
        (list) => list.list_id !== state.selectedList.list_id
      );
      state.selectedList = getDefaultList();
    },
    setEditingList: (state, action) => {
      state.editingList = action.payload;
    },
    setStaffStuff: (state, action) => {
      state.staffStuff = { ...state.staffStuff, ...action.payload };
      saveStaffStuffToStorage(state.staffStuff);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLists.fulfilled, (state, action) => {
        state.allLists = action.payload.myLists;
        state.sharedLists = action.payload.sharedLists;
      })
      .addCase(fetchTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.allTodos = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllTodosForAllLists.fulfilled, (state, action) => {
        state.allListsTodos = action.payload;
        state.isLoading = false;
        state.currentFilter = "";
        state.selectedList = getDefaultList();
      })
      .addCase(fetchBrainDump.fulfilled, (state, action) => {
        state.brainDump = action.payload;
      });
  },
});

export const {
  setLoading,
  setAllTodo,
  setFilter,
  removeItems,
  selectItem,
  addNewTodo,
  updateTodo,
  setAddNewTask,
  markTaskAsCompleted,
  updateTodoData,
  setStaffStuff,
  addNewList,
  updateList,
  changeTodoList,
  removeSelectedList,
  shareSelectedList,
  setEditingList,
} = TodoSlice.actions;
export default TodoSlice.reducer;
