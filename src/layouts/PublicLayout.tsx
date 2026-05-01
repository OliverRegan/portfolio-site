import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
