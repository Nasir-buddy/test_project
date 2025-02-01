import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./tasksSlice"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("kanbanState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("kanbanState", serializedState)
  } catch (err) {
    // Handle errors here
  }
}

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(() => {
  saveState(store.getState())
})

export default store

