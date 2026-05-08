import { Link, Outlet, useLocation } from 'react-router-dom'
import { Car, Users, LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: '儀表板', icon: LayoutDashboard },
  { to: '/vehicles', label: '車輛管理', icon: Car },
]

const adminNavItems = [
  { to: '/employees', label: '員工管理', icon: Users },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (to: string) => location.pathname === to

  const allNav = user?.role === 'admin' ? [...navItems, ...adminNavItems] : navItems

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r flex flex-col bg-card">
        <div className="p-4 border-b">
          <h1 className="font-bold text-lg">車輛管理系統</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {allNav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(to)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground mb-1">
            <span className="font-medium text-foreground">{user?.username}</span>
            <span className="ml-auto text-xs bg-secondary px-1.5 py-0.5 rounded">
              {user?.role === 'admin' ? '管理者' : '使用者'}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={logout}>
            <LogOut className="h-4 w-4" />
            登出
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
