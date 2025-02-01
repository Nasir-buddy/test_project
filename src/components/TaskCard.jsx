import { MessageSquare, Paperclip, MoreHorizontal } from "lucide-react"

export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            task.priority === "low" ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"
          }`}
        >
          {task.priority}
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <h3 className="font-semibold mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

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

