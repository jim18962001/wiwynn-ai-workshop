import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'

const schema = z.object({
  username: z.string().min(1, '帳號為必填'),
  password: z.string().min(1, '密碼為必填'),
})
type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setServerError('')
    try {
      const res = await api.post('/auth/login', data)
      login({ ...res.data.user, token: res.data.token })
      navigate('/dashboard', { replace: true })
    } catch {
      setServerError('帳號或密碼錯誤')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">車輛管理系統</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">帳號</Label>
              <Input id="username" placeholder="輸入帳號" {...register('username')} />
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">密碼</Label>
              <Input id="password" type="password" placeholder="輸入密碼" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            {serverError && <p className="text-sm text-destructive text-center">{serverError}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? '登入中...' : '登入'}
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            管理者：admin / admin123 ｜ 使用者：user / user123
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
