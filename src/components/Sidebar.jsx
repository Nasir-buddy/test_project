import { useState } from "react"
import { Home, MessageSquare, ListTodo, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: MessageSquare, label: "Messages" },
  { icon: ListTodo, label: "Tasks" },
  { icon: Users, label: "Members" },
  { icon: Settings, label: "Settings" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className="flex h-screen">
      <div
        className={`
          relative flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-16"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex-shrink-0"></div>
              <span className="font-semibold whitespace-nowrap">Project M.</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <nav className="flex-grow">
          {menuItems.map((item) => (
              <div
              key={item.label}
              href="#"
              className="flex ml-2 gap-3 items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <item.icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>
      
    </div>
  )
}

