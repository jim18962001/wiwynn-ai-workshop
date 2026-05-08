import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { Vehicle, VehicleStatus } from '@/types'

const schema = z.object({
  plateNumber: z.string().min(1, '車牌號碼為必填'),
  model: z.string().min(1, '車輛型號為必填'),
  status: z.enum(['使用中', '閒置', '維修中'] as const),
  assignedEmployeeName: z.string().optional(),
})

export type VehicleFormValues = z.infer<typeof schema>

interface VehicleFormProps {
  defaultValues?: Partial<Vehicle>
  onSubmit: (data: VehicleFormValues) => void
  isSubmitting?: boolean
  onCancel: () => void
}

const statuses: VehicleStatus[] = ['使用中', '閒置', '維修中']

export function VehicleForm({ defaultValues, onSubmit, isSubmitting, onCancel }: VehicleFormProps) {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<VehicleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      plateNumber: defaultValues?.plateNumber ?? '',
      model: defaultValues?.model ?? '',
      status: defaultValues?.status ?? '閒置',
      assignedEmployeeName: defaultValues?.assignedEmployeeName ?? '',
    },
  })

  useEffect(() => {
    if (defaultValues) reset({
      plateNumber: defaultValues.plateNumber ?? '',
      model: defaultValues.model ?? '',
      status: defaultValues.status ?? '閒置',
      assignedEmployeeName: defaultValues.assignedEmployeeName ?? '',
    })
  }, [defaultValues, reset])

  const currentStatus = watch('status')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label>車牌號碼</Label>
        <Input placeholder="例：ABC-1234" {...register('plateNumber')} />
        {errors.plateNumber && <p className="text-sm text-destructive">{errors.plateNumber.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>車輛型號</Label>
        <Input placeholder="例：Toyota Camry" {...register('model')} />
        {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>狀態</Label>
        <Select value={currentStatus} onValueChange={(v) => setValue('status', v as VehicleStatus)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>指派員工（選填）</Label>
        <Input placeholder="輸入員工姓名" {...register('assignedEmployeeName')} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>取消</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? '儲存中...' : '儲存'}</Button>
      </div>
    </form>
  )
}
