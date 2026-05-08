import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Employee } from '@/types'

const schema = z.object({
  name: z.string().min(1, '姓名為必填'),
  title: z.string().min(1, '職稱為必填'),
  department: z.string().min(1, '部門為必填'),
  email: z.string().min(1, 'Email 為必填').email('請輸入有效的 Email 格式'),
  phone: z.string().optional(),
})

export type EmployeeFormValues = z.infer<typeof schema>

interface EmployeeFormProps {
  defaultValues?: Partial<Employee>
  onSubmit: (data: EmployeeFormValues) => void
  isSubmitting?: boolean
  onCancel: () => void
}

export function EmployeeForm({ defaultValues, onSubmit, isSubmitting, onCancel }: EmployeeFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      title: defaultValues?.title ?? '',
      department: defaultValues?.department ?? '',
      email: defaultValues?.email ?? '',
      phone: defaultValues?.phone ?? '',
    },
  })

  useEffect(() => {
    if (defaultValues) reset({
      name: defaultValues.name ?? '',
      title: defaultValues.title ?? '',
      department: defaultValues.department ?? '',
      email: defaultValues.email ?? '',
      phone: defaultValues.phone ?? '',
    })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>姓名</Label>
          <Input placeholder="輸入姓名" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>職稱</Label>
          <Input placeholder="例：工程師" {...register('title')} />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <Label>部門</Label>
        <Input placeholder="例：技術部" {...register('department')} />
        {errors.department && <p className="text-sm text-destructive">{errors.department.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" placeholder="name@example.com" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>電話（選填）</Label>
        <Input placeholder="09XX-XXX-XXX" {...register('phone')} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>取消</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? '儲存中...' : '儲存'}</Button>
      </div>
    </form>
  )
}
