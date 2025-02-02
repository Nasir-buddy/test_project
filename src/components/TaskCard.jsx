import { MessageSquare, Paperclip, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, addSubtask } from "../store/tasksSlice";

export default function TaskCard({ task, updateTask }) {
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;
    setDueDate(newDueDate);
    dispatch(updateTask({ ...task, dueDate: newDueDate }));
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleSubtaskForm = () => {
    setShowSubtaskForm((prev) => !prev);
    setShowDropdown(false);
  };

  const createSubtask = () => {
    if (subtaskTitle.trim() === "") {
      alert("Please enter a subtask title!");
      return;
    }

    dispatch(addSubtask({ status: "todo", taskId: task.id, subtaskTitle }));
    setSubtaskTitle("");
    setShowSubtaskForm(false);
  };

  let priorityClass = "";
  if (task.priority === "low") {
    priorityClass = "bg-green-100 text-green-600";
  } else if (task.priority === "medium") {
    priorityClass = "bg-yellow-100 text-yellow-600";
  } else if (task.priority === "high") {
    priorityClass = "bg-red-100 text-red-600";
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs ${priorityClass}`}>
            {task.priority}
          </span>
          {task.tags &&
            task.tags.length > 0 &&
            task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-600"
              >
                {tag}
              </span>
            ))}
        </div>

        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={toggleDropdown}
          >
            <MoreHorizontal size={16} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={toggleSubtaskForm}
              >
                Create Subtask
              </button>
            </div>
          )}
        </div>

      </div>

      <h3 className="font-semibold mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      <div className="mb-4">
        <label htmlFor="due-date" className="text-sm text-gray-600 font-bold">
          Due Date:
        </label>
        <input
          type="datetime-local"
          id="due-date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="w-full px-3 py-2 mt-1 text-sm border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {task.subtasks?.length > 0 && (
        <div className="bg-gray-100 p-3 rounded-lg mt-2">
          <h4 className="font-semibold text-sm mb-2">Subtasks</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {task.subtasks.map((subtask) => (
              <li key={subtask.id} className="py-1">
                {subtask.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSubtaskForm && (
        <div className="bg-gray-50 p-3 rounded-lg my-2 mb border border-gray-300">
          <h2 className="text-sm font-semibold mb-2">Create Subtask</h2>
          <input
            type="text"
            className="w-full border rounded-md p-2 mb-3"
            placeholder="Enter Subtask Title"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md"
              onClick={() => setShowSubtaskForm(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={createSubtask}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2 my-3">
          {task.users.map((user, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
            />
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>{task.comments} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip size={16} />
            <span>{task.files} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}

