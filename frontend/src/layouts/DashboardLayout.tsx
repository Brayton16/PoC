import { Outlet } from 'react-router-dom'
import Sidebar from '../components/UserSidebar'
import Topbar from '../components/UserNavbar'

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex w-full bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-white">
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex flex-row flex-1 w-full min-h-[calc(100vh-64px)] overflow-hidden">
          <Sidebar />
          <div className="flex-1 p-6 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

