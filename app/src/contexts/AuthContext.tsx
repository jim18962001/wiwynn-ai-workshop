import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): User | null {
  try {
    const token = localStorage.getItem('token')
    const raw = localStorage.getItem('user')
    if (!token || !raw) return null
    return { ...JSON.parse(raw), token }
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  const login = useCallback((u: User) => {
    localStorage.setItem('token', u.token)
    localStorage.setItem('user', JSON.stringify({ id: u.id, username: u.username, role: u.role }))
    setUser(u)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>
}
