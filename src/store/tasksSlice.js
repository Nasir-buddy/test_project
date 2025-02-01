import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tasks: {
    todo: [
      {
        id: "1", // Ensure this is a string
        title: "Brainstorming",
        description: "Brainstorming brings team members' diverse experience into play.",
        priority: "low",
        comments: 12,
        files: 0,
        users: ["user1", "user2", "user3"],
      },
    ],
    inProgress: [],
    done: [],
  },
  filter: "all",
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { status, task } = action.payload
      state.tasks[status].push(task)
    },
    moveTask: (state, action) => {
      const { fromStatus, toStatus, taskId } = action.payload
      const taskIndex = state.tasks[fromStatus].findIndex((task) => task.id === taskId)
      if (taskIndex !== -1) {
        const [task] = state.tasks[fromStatus].splice(taskIndex, 1)
        state.tasks[toStatus].push(task)
      }
    },

    updateTask: (state, action) => {
      const { status, updatedTask } = action.payload;
      const taskIndex = state.tasks[status].findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state.tasks[status][taskIndex] = updatedTask;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export const { addTask, moveTask,updateTask, setFilter } = tasksSlice.actions
export default tasksSlice.reducer

