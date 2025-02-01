import { useEffect, useState } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/tasksSlice"
import TaskCard from "./TaskCard"

export default function TodoSection({ tasks }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
    tags: "",
    dueDate:""
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const now=new Date();
    tasks.forEach(task=>{
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const timeRemaining = dueDate - now;

        if (timeRemaining <= 0) {
          showNotification(`Task "${task.title}" is past due!`);
        } else if (timeRemaining <= 5 * 60 * 1000) {
          showNotification(`Task "${task.title}" is due soon!`);
        }
      }
    });
  }, [tasks]);


  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Task Reminder", { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Task Reminder", { body: message });
        }
      });
    }
  };


  const handleAddTask = (e) => {
    e.preventDefault()
    const tagsArray = newTask.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    const task = {
      id: Date.now().toString(), 
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      tags: tagsArray,
      comments: 0,
      files: 0,
      users: ["user1"],
    }
    dispatch(addTask({ status: "todo", task }))
    // Reset form state
    setNewTask({ title: "", description: "", priority: "low", tags: "" })
    setShowAddForm(false)
  }

  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          <h2 className="font-semibold">To Do</h2>
          <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">{tasks.length}</span>
        </div>
        <button onClick={() => setShowAddForm(true)} className="p-1 hover:bg-gray-100 rounded">
          <Plus size={20} />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTask} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          {/* Priority dropdown */}
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {/* Comma-separated tags input */}
          <input
            type="text"
            placeholder="Comma-separated tags"
            value={newTask.tags}
            onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="flex gap-2">
            <button type="submit" className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}