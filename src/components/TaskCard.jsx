import { MessageSquare, Paperclip, MoreHorizontal } from "lucide-react"
import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { updateTask} from "../store/tasksSlice";




export default function TaskCard({ task,updateTask }) {
  const dispatch = useDispatch();

  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;
    setDueDate(newDueDate);
    dispatch(updateTask({ ...task, dueDate: newDueDate }));
  };
  let priorityClass = ""
  if (task.priority === "low") {
    priorityClass = "bg-green-100 text-green-600"
  } else if (task.priority === "medium") {
    priorityClass = "bg-yellow-100 text-yellow-600"
  } else if (task.priority === "high") {
    priorityClass = "bg-red-100 text-red-600"
  }

  return (

    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs ${priorityClass}`}>
            {task.priority}
          </span>
          {/* Render tags beside the priority badge */}
          {task.tags && task.tags.length > 0 && task.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-600">
              {tag}
            </span>
          ))}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <h3 className="font-semibold mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      <div className="mb-4">
        <label htmlFor="due-date" className="text-sm text-gray-600">Due Date:</label>
        <input
          type="datetime-local"
          id="due-date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="w-full px-3 py-2 mt-1 text-sm border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {task.users.map((user, index) => (
            <div key={index} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
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
  )
}

