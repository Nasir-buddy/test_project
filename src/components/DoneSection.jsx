import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/tasksSlice";
import TaskCard from "./TaskCard";

export default function DoneSection({ tasks }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
    tags: "",
  });
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    const tagsArray = newTask.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      tags: tagsArray,
      comments: 0,
      files: 0,
      users: ["user1"],
    };
    dispatch(addTask({ status: "done", task }));
    // Reset form state
    setNewTask({ title: "", description: "", priority: "low", tags: "" });
    setShowAddForm(false);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Handle the updating of tasks' order or status
    dispatch(updateTask({ taskId: draggableId, newStatus: destination.droppableId }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 bg-[#f5f5f5] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h2 className="font-semibold">Done</h2>
            <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus size={13} />
          </button>
        </div>
        <hr className="bg-[#8bc48a] h-1 rounded-md my-6 border-none" />
        {showAddForm && (
          <form
            onSubmit={handleAddTask}
            className="mb-4 p-4 bg-white rounded-lg shadow-sm"
          >
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              placeholder="Comma-separated tags"
              value={newTask.tags}
              onChange={(e) =>
                setNewTask({ ...newTask, tags: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
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
        <Droppable droppableId="done">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
    </DragDropContext>
  );
}
