import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type { ActivityLog } from '@/types'

export function useActivityLogs() {
  return useQuery<ActivityLog[]>({
    queryKey: ['activity-logs'],
    queryFn: async () => (await api.get('/activity-logs')).data,
    staleTime: 60_000,
  })
}
