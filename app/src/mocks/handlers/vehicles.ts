import { http, HttpResponse } from 'msw'
import { vehiclesData } from '../data/vehicles'
import type { Vehicle } from '@/types'

let vehicles = [...vehiclesData]

export const vehicleHandlers = [
  http.get('/api/vehicles', () => {
    return HttpResponse.json(vehicles)
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = await request.json() as Omit<Vehicle, 'id' | 'updatedAt'>
    const newVehicle: Vehicle = {
      ...body,
      id: String(Date.now()),
      updatedAt: new Date().toISOString().split('T')[0],
    }
    vehicles.push(newVehicle)
    return HttpResponse.json(newVehicle, { status: 201 })
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const { id } = params
    const body = await request.json() as Partial<Vehicle>
    const idx = vehicles.findIndex(v => v.id === id)
    if (idx === -1) return HttpResponse.json({ message: '車輛不存在' }, { status: 404 })
    vehicles[idx] = { ...vehicles[idx], ...body, updatedAt: new Date().toISOString().split('T')[0] }
    return HttpResponse.json(vehicles[idx])
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const { id } = params
    const idx = vehicles.findIndex(v => v.id === id)
    if (idx === -1) return HttpResponse.json({ message: '車輛不存在' }, { status: 404 })
    vehicles.splice(idx, 1)
    return HttpResponse.json({ success: true })
  }),
]
