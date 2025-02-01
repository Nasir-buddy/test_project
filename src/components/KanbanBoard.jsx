import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"
import { moveTask,updateTask } from "../store/tasksSlice"
import TodoSection from "./TodoSection"
import InProgressSection from "./InProgressSection"
import DoneSection from "./DoneSection"

export default function KanbanBoard() {
  const dispatch = useDispatch()
  const { tasks, filter } = useSelector((state) => state.tasks)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const fromStatus = result.source.droppableId
    const toStatus = result.destination.droppableId
    const taskId = result.draggableId

    if (fromStatus !== toStatus) {
      dispatch(moveTask({ fromStatus, toStatus, taskId }))
    }
  }

  const handleTaskUpdate = (updatedTask) => {
    dispatch(updateTask(updatedTask)); 
  };

  const filteredTasks = (status) => {
    return tasks[status].filter((task) => {
      if (filter === "all") return true
      return task.priority === filter
    })
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6">
        <TodoSection tasks={filteredTasks("todo")} />
        <InProgressSection tasks={filteredTasks("inProgress")} onUpdateTask={handleTaskUpdate} />
        <DoneSection tasks={filteredTasks("done")}  onUpdateTask={handleTaskUpdate}/>
      </div>
    </DragDropContext>
  )
}

