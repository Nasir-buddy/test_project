import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {
    todo: [
      {
        id: "1",
        title: "Brainstorming",
        description:
          "Brainstorming brings team members' diverse experience into play.",
        priority: "low",
        comments: 12,
        files: 0,
        users: ["user1", "user2", "user3"],
        subtasks: [],
        dueDate: null, // Added dueDate field
      },
    ],
    inProgress: [],
    done: [],
  },
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add Task to category (todo, inProgress, done)
    addTask: (state, action) => {
      const { status, task } = action.payload;
      state.tasks[status].push({ ...task, subtasks: [] });
    },

    // Move Task between different categories
    moveTask: (state, action) => {
      const { fromStatus, toStatus, taskId } = action.payload;
      const taskIndex = state.tasks[fromStatus].findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const [task] = state.tasks[fromStatus].splice(taskIndex, 1);
        state.tasks[toStatus].push(task);
      }
    },

    // Set task filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Add Subtask to a specific task
    addSubtask: (state, action) => {
      const { status, taskId, subtaskTitle } = action.payload
      if (state.tasks[status]) {
        const task = state.tasks[status].find((task) => task.id === taskId)
        if (task) {
          if (!Array.isArray(task.subtasks)) {
            task.subtasks = []
          }
          task.subtasks.push({
            id: Date.now().toString(),
            title: subtaskTitle,
            completed: false,
          })
        }
      }
    },

    // Toggle Subtask Completion
    toggleSubtask: (state, action) => {
      const { status, taskId, subtaskId } = action.payload;
      const task = state.tasks[status].find((task) => task.id === taskId);
      if (task) {
        const subtask = task.subtasks.find((sub) => sub.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
        }
      }
    },

    // Remove a Subtask
    removeSubtask: (state, action) => {
      const { status, taskId, subtaskId } = action.payload;
      const task = state.tasks[status].find((task) => task.id === taskId);
      if (task) {
        task.subtasks = task.subtasks.filter((sub) => sub.id !== subtaskId);
      }
    },

    // Update Task
    updateTask: (state, action) => {
      const { status, taskId, updatedTask } = action.payload;
      const task = state.tasks[status].find((task) => task.id === taskId);
      if (task) {
        Object.assign(task, updatedTask);
      }
    },
  },
});

export const {
  addTask,
  moveTask,
  setFilter,
  addSubtask,
  toggleSubtask,
  removeSubtask,
  updateTask
} = tasksSlice.actions;
export default tasksSlice.reducer;
