import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <main className="flex-1 pb-14">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
