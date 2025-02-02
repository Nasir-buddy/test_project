import { useEffect, useState } from "react"
import { Home, MessageSquare, ListTodo, Users, Settings, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { TbCircleDottedLetterM } from "react-icons/tb"

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: MessageSquare, label: "Messages" },
  { icon: ListTodo, label: "Tasks" },
  { icon: Users, label: "Members" },
  { icon: Settings, label: "Settings" },
]

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [reminderTime, setReminderTime] = useState(60)

  useEffect(() => {
    const savedReminderTime = localStorage.getItem("reminderTime")
    if (savedReminderTime) {
      setReminderTime(Number.parseInt(savedReminderTime, 10))
    }
  }, [])

  const handleReminderTimeChange = (e) => {
    const newReminderTime = Number.parseInt(e.target.value, 10)
    setReminderTime(newReminderTime)
    localStorage.setItem("reminderTime", newReminderTime)
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white  border-r border-gray-200 transition-all duration-300 ease-in-out z-30
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mt-3 p-4">
          {isOpen && (
            <div className="flex items-center  gap-2 overflow-hidden">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0">
                <TbCircleDottedLetterM className="text-3xl text-[#5030e5]" />
              </div>
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
        <hr className="mt-3  border-[#e5e7eb]" />
        <nav className="flex-grow">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="flex ml-2 gap-3 items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <item.icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </div>
          ))}

          <div className="flex w-full justify-evenly mt-6 mb-3">
            <hr className="w-[80%] border-[#e5e7eb]" />
          </div>


           {isOpen && (
             <div class="">
             <div class="bg-white rounded-lg p-6">
               <div>
               <h2 class="text-sm font-bold text-gray-500 mb-4">MY PROJECTS</h2>
               </div>
               <div class="space-y-2">
                 <div class="flex items-center bg-indigo-50 rounded-md p-2">
                   <div class="h-2.5 w-2.5 bg-green-500 rounded-full mr-2"></div>
                   <span class="text-gray-900">Mobile App</span>
                 </div>
                 <div class="flex items-center p-2">
                   <div class="h-2.5 w-2.5 bg-orange-500 rounded-full mr-2"></div>
                   <span class="text-gray-900">Website Redesign</span>
                 </div>
                 <div class="flex items-center p-2">
                   <div class="h-2.5 w-2.5 bg-purple-500 rounded-full mr-2"></div>
                   <span class="text-gray-900">Design System</span>
                 </div>
                 <div class="flex items-center p-2">
                   <div class="h-2.5 w-2.5 bg-blue-500 rounded-full mr-2"></div>
                   <span class="text-gray-900">Wireframes</span>
                 </div>
                 
               </div>
             </div>
           </div>
           )}
        </nav>
           
        {/* lower UI */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold mb-2">Reminder Settings</h3>
            <label className="text-sm text-gray-700 flex flex-col">
              Notify me:
              <input
                type="number"
                min="1"
                value={reminderTime}
                onChange={handleReminderTimeChange}
                className="w-full mt-1 p-1 border rounded"
              />
              <span className="text-xs text-gray-500">minutes before due date</span>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

