import { Home, MessageSquare, ListTodo, Users, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
        <span className="font-semibold">Project M.</span>
      </div>
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <Home size={20} />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <MessageSquare size={20} />
          <span>Messages</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <ListTodo size={20} />
          <span>Tasks</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <Users size={20} />
          <span>Members</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
    </div>
  )
}

