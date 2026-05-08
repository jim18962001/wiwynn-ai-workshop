import { http, HttpResponse } from 'msw'
import { activityLogsData } from '../data/activityLogs'

export const activityLogHandlers = [
  http.get('/api/activity-logs', () => {
    return HttpResponse.json(activityLogsData)
  }),
]
