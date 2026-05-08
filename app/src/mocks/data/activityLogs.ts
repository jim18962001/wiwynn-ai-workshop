import type { ActivityLog } from '@/types'

export const activityLogsData: ActivityLog[] = [
  { id: '1',  userId: 'u1', userName: '王大明', action: 'LOGIN',  resource: 'system',          timestamp: '2026-05-08T08:01:00Z' },
  { id: '2',  userId: 'u1', userName: '王大明', action: 'CREATE', resource: 'vehicle:ABC-1234', timestamp: '2026-05-08T08:15:22Z' },
  { id: '3',  userId: 'u2', userName: '李小華', action: 'LOGIN',  resource: 'system',          timestamp: '2026-05-08T08:30:00Z' },
  { id: '4',  userId: 'u2', userName: '李小華', action: 'UPDATE', resource: 'vehicle:XYZ-5678', timestamp: '2026-05-08T08:45:10Z' },
  { id: '5',  userId: 'u1', userName: '王大明', action: 'DELETE', resource: 'employee:E-009',   timestamp: '2026-05-08T09:00:05Z' },
  { id: '6',  userId: 'u3', userName: '張三',   action: 'LOGIN',  resource: 'system',          timestamp: '2026-05-08T09:10:00Z' },
  { id: '7',  userId: 'u3', userName: '張三',   action: 'UPDATE', resource: 'employee:E-002',   timestamp: '2026-05-08T09:20:33Z' },
  { id: '8',  userId: 'u2', userName: '李小華', action: 'CREATE', resource: 'employee:E-010',   timestamp: '2026-05-08T09:35:47Z' },
  { id: '9',  userId: 'u1', userName: '王大明', action: 'UPDATE', resource: 'vehicle:DEF-9012', timestamp: '2026-05-08T10:00:00Z' },
  { id: '10', userId: 'u3', userName: '張三',   action: 'LOGOUT', resource: 'system',          timestamp: '2026-05-08T10:15:00Z' },
  { id: '11', userId: 'u4', userName: '陳美玲', action: 'LOGIN',  resource: 'system',          timestamp: '2026-05-08T10:20:00Z' },
  { id: '12', userId: 'u4', userName: '陳美玲', action: 'UPDATE', resource: 'vehicle:GHI-3456', timestamp: '2026-05-08T10:30:15Z' },
  { id: '13', userId: 'u2', userName: '李小華', action: 'DELETE', resource: 'vehicle:JKL-7890', timestamp: '2026-05-08T11:00:00Z' },
  { id: '14', userId: 'u1', userName: '王大明', action: 'CREATE', resource: 'vehicle:MNO-2345', timestamp: '2026-05-08T11:20:00Z' },
  { id: '15', userId: 'u4', userName: '陳美玲', action: 'LOGOUT', resource: 'system',          timestamp: '2026-05-08T11:45:00Z' },
  { id: '16', userId: 'u1', userName: '王大明', action: 'LOGOUT', resource: 'system',          timestamp: '2026-05-08T12:00:00Z' },
  { id: '17', userId: 'u2', userName: '李小華', action: 'UPDATE', resource: 'vehicle:ABC-1234', timestamp: '2026-05-08T13:05:22Z' },
]
