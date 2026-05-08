import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  loading?: boolean
  description?: string
}

export function ConfirmDeleteDialog({ open, onOpenChange, onConfirm, loading, description }: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>確認刪除</DialogTitle>
          <DialogDescription>{description ?? '此操作無法復原。'}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>取消</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? '刪除中...' : '確認刪除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
