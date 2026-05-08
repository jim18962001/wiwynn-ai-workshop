import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { VehicleForm, type VehicleFormValues } from '@/components/shared/VehicleForm'
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog'
import { useVehicles, useCreateVehicle, useUpdateVehicle, useDeleteVehicle } from '@/hooks/useVehicles'
import type { Vehicle, VehicleStatus } from '@/types'

const statusVariant: Record<VehicleStatus, 'default' | 'secondary' | 'destructive'> = {
  '使用中': 'default',
  '閒置': 'secondary',
  '維修中': 'destructive',
}

export function VehiclesPage() {
  const { data: vehicles, isLoading } = useVehicles()
  const create = useCreateVehicle()
  const update = useUpdateVehicle()
  const remove = useDeleteVehicle()

  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Vehicle | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleCreate = (values: VehicleFormValues) => {
    create.mutate(
      { ...values, status: values.status },
      { onSuccess: () => setAddOpen(false) },
    )
  }

  const handleUpdate = (values: VehicleFormValues) => {
    if (!editTarget) return
    update.mutate(
      { id: editTarget.id, ...values },
      { onSuccess: () => setEditTarget(null) },
    )
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    remove.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">車輛管理</h2>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />新增車輛
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>車牌號碼</TableHead>
              <TableHead>型號</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>指派員工</TableHead>
              <TableHead>最後更新</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : vehicles?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  目前無車輛資料
                </TableCell>
              </TableRow>
            ) : vehicles?.map(v => (
              <TableRow key={v.id}>
                <TableCell className="font-mono">{v.plateNumber}</TableCell>
                <TableCell>{v.model}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[v.status]}>{v.status}</Badge>
                </TableCell>
                <TableCell>{v.assignedEmployeeName ?? '—'}</TableCell>
                <TableCell>{v.updatedAt}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditTarget(v)}>編輯</Button>
                  <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(v.id)}>刪除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>新增車輛</DialogTitle></DialogHeader>
          <VehicleForm onSubmit={handleCreate} onCancel={() => setAddOpen(false)} isSubmitting={create.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTarget} onOpenChange={open => !open && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>編輯車輛</DialogTitle></DialogHeader>
          <VehicleForm
            defaultValues={editTarget ?? undefined}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            isSubmitting={update.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={open => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={remove.isPending}
        description="確認刪除此車輛？此操作無法復原。"
      />
    </div>
  )
}
