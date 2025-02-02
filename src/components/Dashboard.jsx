import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import Sidebar from "./Sidebar"
import KanbanBoard from "./KanbanBoard"
import { Filter } from "lucide-react"
import { FaAngleDown, FaBell, FaList, FaRegCalendarAlt, FaRegQuestionCircle, FaSearch } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { IoMdAdd, IoMdLink } from "react-icons/io"
import { MdOutlinePeopleAlt, MdOutlineToday } from "react-icons/md"
import { BiCategory } from "react-icons/bi"

function Dashboard() {
  const dispatch = useDispatch()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <header className="border-b border-gray-200 bg-white p-3 px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-[33%]">
              <FaSearch className="text-gray-400 mx-2" size={20} />
              <input
                type="text"
                placeholder="Search for anything..."
                className="bg-gray-100 text-gray-600 placeholder-gray-400 outline-none rounded-md w-full"
              />
            </div>

            <div className="w-[23%]">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg w-full max-w-xl">
                <div className="flex items-center space-x-4">
                  <FaRegCalendarAlt className="text-gray-500" size={20} />
                  <FaRegQuestionCircle className="text-gray-500" size={20} />
                  <div className="relative">
                    <FaBell className="text-gray-500" size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">Palak Jain</p>
                    <p className="text-xs text-gray-500">Rajasthan, India</p>
                  </div>
                  <img
                    src="https://wallpaperbat.com/img/492674-cute-girl-art-4k-iphone-hd-4k-wallpaper-image-background-photo-and-picture.jpg"
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 w-full flex items-center justify-between px-10 my-4">
            <div className="flex items-center">
              <div className="w-fit">
                <h1 className="text-5xl font-semibold">Mobile App</h1>
              </div>
              <div className="flex items-center mt-4 justify-center ml-7 bg-[#dcd6fa] h-6 w-6 rounded-md">
                <GoPencil className="text-sm text-[#6a4fe9]" />
              </div>
              <div className="flex items-center mt-4 justify-center ml-7 bg-[#dcd6fa] h-6 w-6 rounded-md">
                <IoMdLink className="text-sm text-[#6a4fe9]" />
              </div>
            </div>

            <div className="w-[20%]">
              <div className="flex items-center justify-evenly">
                <button className="flex items-center text-[#5030e5]">
                  <div className="flex items-center justify-center ml-7 bg-[#dcd6fa] h-6 w-6 rounded-md">
                    <IoMdAdd className="text-sm text-[#5030e5]" />
                  </div>
                  <span className="ml-3">Invite</span>
                </button>
                <div className="flex items-center">
                  <div className="relative inline-block h-8 w-8 bg-yellow-500 rounded-full overflow-hidden">
                    <img
                      src="https://th.bing.com/th/id/OIP.bmUA5Zj5wfmIH4DVSz71CQHaJQ?w=937&h=1171&rs=1&pid=ImgDetMain"
                      alt=""
                    />
                  </div>
                  <div className="relative inline-block -ml-2 h-8 w-8 bg-green-500 rounded-full overflow-hidden">
                    <img
                      src="https://th.bing.com/th/id/OIP.i92gn5QoSKdOpT4wL0tOrwHaJQ?w=1080&h=1350&rs=1&pid=ImgDetMain"
                      alt=""
                    />
                  </div>
                  <div className="relative inline-block -ml-2 h-8 w-8 bg-blue-500 rounded-full overflow-hidden">
                    <img
                      src="https://www.hdwallpapers.in/download/blonde_girl_model_is_wearing_hoop_earrings_and_white_dress_standing_in_blur_bokeh_background_4k_hd_girls-720x1280.jpg"
                      alt=""
                    />
                  </div>
                  <div className="relative inline-block -ml-2 h-8 w-8 bg-pink-500 rounded-full overflow-hidden">
                    <img
                      src="https://th.bing.com/th/id/OIP.EPsrnB-Mdsxb8K64xpJ4tgHaJP?w=740&h=923&rs=1&pid=ImgDetMain"
                      alt=""
                    />
                  </div>
                  <div className="relative -ml-3 h-8 w-8 bg-[#f4d7da] rounded-full overflow-hidden flex items-center justify-center text-sm text-gray-600">
                    <h4 className="font-bold text-[#d25b68] ">+2</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 px-10">
            <div className="flex items-center justify-between gap-4 ">
              <div className="flex gap-2">
                <div className="border-2 rounded-md p-[6px] px-2 flex items-center gap-3  text-gray-400">
                  <Filter className="w-4 h-4" />
                  <h3 className="font-bold">Filter</h3>
                  <FaAngleDown />
                </div>

                <div className="border-2 rounded-md p-[6px] px-2 flex items-center gap-3  text-gray-400">
                  <MdOutlineToday />
                  <h3 className="font-bold">Today</h3>
                  <FaAngleDown />
                </div>
              </div>
              <div className="w-[15%] flex items-center justify-evenly">
                <div>
                  <div className="border-2 rounded-md p-[6px] px-2 flex items-center gap-2  text-gray-400">
                    <MdOutlinePeopleAlt />
                    <h3 className="font-bold">Share</h3>
                  </div>
                </div>
                <div className="h-full w-[1.3%] ronded-md mx-3 bg-gray-400 text-gray-400">|</div>
                <div className="h-8 w-8 flex items-center text-xl text-white bg-[#5030e5] justify-center rounded-md">
                  <FaList />
                </div>
                <div className="h-8 w-8 flex items-center text-xl text-white bg-[#5030e5] justify-center rounded-md">
                  <BiCategory />
                </div>
              </div>
            </div>
          </div>
          <KanbanBoard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

