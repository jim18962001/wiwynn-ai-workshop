import { http, HttpResponse } from 'msw'
import { vehiclesData } from '../data/vehicles'
import { employeesData } from '../data/employees'

export const statsHandlers = [
  http.get('/api/stats', () => {
    const total = vehiclesData.length
    const active = vehiclesData.filter(v => v.status === '使用中').length
    const idle = vehiclesData.filter(v => v.status === '閒置').length
    const maintenance = vehiclesData.filter(v => v.status === '維修中').length

    return HttpResponse.json({
      totalVehicles: total,
      activeVehicles: active,
      idleVehicles: idle,
      totalEmployees: employeesData.length,
      vehicleStatusDistribution: [
        { name: '使用中', value: active },
        { name: '閒置', value: idle },
        { name: '維修中', value: maintenance },
      ],
      monthlyUsage: [
        { month: '12月', count: 18 },
        { month: '1月', count: 22 },
        { month: '2月', count: 19 },
        { month: '3月', count: 25 },
        { month: '4月', count: 21 },
        { month: '5月', count: active },
      ],
    })
  }),
]
