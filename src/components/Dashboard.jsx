import { Filter, Share2 } from "lucide-react"
import { useDispatch } from "react-redux"
import { setFilter } from "../store/tasksSlice"
import Sidebar from "./Sidebar"
import KanbanBoard from "./KanbanBoard"

function Dashboard() {
  const dispatch = useDispatch()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <header className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Mobile App</h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-gray-100"
                  onClick={() => dispatch(setFilter("all"))}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                  onClick={() => dispatch(setFilter("low"))}
                >
                  Today
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-gray-100">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </header>
        <KanbanBoard />
      </main>
    </div>
  )
}

export default Dashboard

