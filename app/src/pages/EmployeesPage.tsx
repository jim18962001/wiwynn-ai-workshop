import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { EmployeeForm, type EmployeeFormValues } from '@/components/shared/EmployeeForm'
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog'
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '@/hooks/useEmployees'
import type { Employee } from '@/types'

export function EmployeesPage() {
  const { data: employees, isLoading } = useEmployees()
  const create = useCreateEmployee()
  const update = useUpdateEmployee()
  const remove = useDeleteEmployee()

  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Employee | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleCreate = (values: EmployeeFormValues) => {
    create.mutate(values, { onSuccess: () => setAddOpen(false) })
  }

  const handleUpdate = (values: EmployeeFormValues) => {
    if (!editTarget) return
    update.mutate({ id: editTarget.id, ...values }, { onSuccess: () => setEditTarget(null) })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    remove.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">員工管理</h2>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />新增員工
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>職稱</TableHead>
              <TableHead>部門</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>電話</TableHead>
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
            ) : employees?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  目前無員工資料
                </TableCell>
              </TableRow>
            ) : employees?.map(e => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.department}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone ?? '—'}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditTarget(e)}>編輯</Button>
                  <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(e.id)}>刪除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>新增員工</DialogTitle></DialogHeader>
          <EmployeeForm onSubmit={handleCreate} onCancel={() => setAddOpen(false)} isSubmitting={create.isPending} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={open => !open && setEditTarget(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>編輯員工</DialogTitle></DialogHeader>
          <EmployeeForm
            defaultValues={editTarget ?? undefined}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            isSubmitting={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={open => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={remove.isPending}
        description="確認刪除此員工？此操作無法復原。"
      />
    </div>
  )
}
