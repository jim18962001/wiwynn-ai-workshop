import { Link, Outlet, useLocation } from 'react-router-dom'
import { Car, Users, LayoutDashboard, LogOut, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: '儀表板', icon: LayoutDashboard },
  { to: '/vehicles', label: '車輛管理', icon: Car },
]

const adminNavItems = [
  { to: '/employees', label: '員工管理', icon: Users },
  { to: '/admin/activity-log', label: '使用者紀錄', icon: ClipboardList },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (to: string) => location.pathname === to

  const allNav = user?.role === 'admin' ? [...navItems, ...adminNavItems] : navItems

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-border/50 bg-card/60 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-border/50 p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/20">
            <Car className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-bold gradient-text">車輛管理系統</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {allNav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive(to)
                  ? 'border border-primary/20 bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-border/50 p-3">
          <div className="mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span className="flex-1 truncate text-sm font-medium">{user?.username}</span>
            <span className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
              {user?.role === 'admin' ? '管理者' : '使用者'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            登出
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
