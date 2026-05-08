import { http, HttpResponse } from 'msw'

const USERS = [
  { id: 'admin-1', username: 'admin', password: 'admin123', role: 'admin' as const },
  { id: 'user-1', username: 'user', password: 'user123', role: 'user' as const },
]

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { username: string; password: string }
    const found = USERS.find(u => u.username === body.username && u.password === body.password)
    if (!found) {
      return HttpResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 })
    }
    return HttpResponse.json({
      token: `mock-token-${found.id}`,
      user: { id: found.id, username: found.username, role: found.role },
    })
  }),
]
