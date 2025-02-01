import { Home, MessageSquare, ListTodo, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  // use state to open and close the side bar
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-white border-r border-gray-200 p-4 transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between mb-8">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
            <span className="font-semibold">Project M.</span>
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-transform duration-300">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <Home size={20} />
          {isOpen && <span>Home</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <MessageSquare size={20} />
          {isOpen && <span>Messages</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <ListTodo size={20} />
          {isOpen && <span>Tasks</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <Users size={20} />
          {isOpen && <span>Members</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
          <Settings size={20} />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
}
