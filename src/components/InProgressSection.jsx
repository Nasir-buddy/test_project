import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import TaskCard from "./TaskCard";

export default function InProgressSection({ tasks }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
    tags: "",
    dueDate: "",
  });
  const dispatch = useDispatch();
  const now = new Date();

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
    dispatch(addTask({ status: "inProgress", task }));
    // Reset form state
    setNewTask({ title: "", description: "", priority: "low", tags: "" });
    setShowAddForm(false);
  };

  return (
    <div className="flex-1 bg-[#f5f5f5] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <h2 className="font-semibold">In Progress</h2>
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
      <hr className="bg-[#ffa500] h-1 my-6 rounded-md border-none"/>
      {showAddForm && (
        <form
          onSubmit={handleAddTask}
          className="mb-4 p-4 bg-white rounded-lg shadow-sm"
        >
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
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
            required
          />
          {/* Priority dropdown */}
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
          {/* Comma-separated tags input */}
          <input
            type="text"
            placeholder="Comma-separated tags"
            value={newTask.tags}
            onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
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
      <Droppable droppableId="inProgress">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {tasks.map((task, index) => {
              const dueDate = new Date(task.dueDate);
              const isPastDue = dueDate <= now;
              const isDueSoon = dueDate - now <= 5 * 60 * 1000;

              return (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        style={{
                          border: isPastDue
                            ? "2px solid red"
                            : isDueSoon
                            ? "2px solid orange"
                            : "none",
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
          
    </div>
  );
}
