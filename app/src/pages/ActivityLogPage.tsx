import { useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { useActivityLogs } from '@/hooks/useActivityLogs'
import type { ActivityAction } from '@/types'

const ACTION_LABELS: Record<ActivityAction, string> = {
  CREATE: '新增',
  UPDATE: '更新',
  DELETE: '刪除',
  LOGIN:  '登入',
  LOGOUT: '登出',
}

const ACTION_OPTIONS: ActivityAction[] = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']

export function ActivityLogPage() {
  const { data: logs, isLoading } = useActivityLogs()
  const [userFilter, setUserFilter] = useState('')
  const [actionFilter, setActionFilter] = useState<ActivityAction | 'ALL'>('ALL')

  const filtered = (logs ?? []).filter(log => {
    const matchUser = log.userName.toLowerCase().includes(userFilter.toLowerCase())
    const matchAction = actionFilter === 'ALL' || log.action === actionFilter
    return matchUser && matchAction
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">使用者紀錄</h2>

      <div className="flex gap-3">
        <Input
          placeholder="依使用者名稱篩選…"
          value={userFilter}
          onChange={e => setUserFilter(e.target.value)}
          className="max-w-xs"
        />
        <Select value={actionFilter} onValueChange={v => setActionFilter(v as ActivityAction | 'ALL')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="操作類型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">全部</SelectItem>
            {ACTION_OPTIONS.map(a => (
              <SelectItem key={a} value={a}>{ACTION_LABELS[a]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>操作人員</TableHead>
              <TableHead>操作類型</TableHead>
              <TableHead>目標資源</TableHead>
              <TableHead>時間</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  無符合條件的紀錄
                </TableCell>
              </TableRow>
            ) : filtered.map(log => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.userName}</TableCell>
                <TableCell>{ACTION_LABELS[log.action]}</TableCell>
                <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString('zh-TW')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
