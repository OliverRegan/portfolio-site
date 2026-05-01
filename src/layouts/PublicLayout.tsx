import { Outlet } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <NavBar />
      <main className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
