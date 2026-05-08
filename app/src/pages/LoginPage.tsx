import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Aurora glow blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[120px]" />

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-4 w-full max-w-sm animate-fade-in-up">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/15 shadow-[0_0_28px_rgba(99,102,241,0.3)]">
            <Car className="h-7 w-7 text-indigo-300" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">車輛管理系統</h1>
          <p className="mt-1 text-sm text-muted-foreground">Fleet Management System</p>
        </div>

        {/* Glass card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">帳號</Label>
              <Input id="username" placeholder="輸入帳號" {...register('username')} />
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">密碼</Label>
              <Input id="password" type="password" placeholder="輸入密碼" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            {serverError && <p className="text-center text-sm text-destructive">{serverError}</p>}
            <Button
              type="submit"
              className="w-full shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(99,102,241,0.55)]"
              disabled={isSubmitting}
            >
              {isSubmitting ? '登入中...' : '登入'}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            管理者：admin / admin123　｜　使用者：user / user123
          </p>
        </div>
      </div>
    </div>
  )
}
