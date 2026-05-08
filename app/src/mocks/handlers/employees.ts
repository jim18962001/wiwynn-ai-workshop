import { http, HttpResponse } from 'msw'
import { employeesData } from '../data/employees'
import type { Employee } from '@/types'

let employees = [...employeesData]

export const employeeHandlers = [
  http.get('/api/employees', () => {
    return HttpResponse.json(employees)
  }),

  http.post('/api/employees', async ({ request }) => {
    const body = await request.json() as Omit<Employee, 'id'>
    const newEmployee: Employee = { ...body, id: String(Date.now()) }
    employees.push(newEmployee)
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  http.put('/api/employees/:id', async ({ params, request }) => {
    const { id } = params
    const body = await request.json() as Partial<Employee>
    const idx = employees.findIndex(e => e.id === id)
    if (idx === -1) return HttpResponse.json({ message: '員工不存在' }, { status: 404 })
    employees[idx] = { ...employees[idx], ...body }
    return HttpResponse.json(employees[idx])
  }),

  http.delete('/api/employees/:id', ({ params }) => {
    const { id } = params
    const idx = employees.findIndex(e => e.id === id)
    if (idx === -1) return HttpResponse.json({ message: '員工不存在' }, { status: 404 })
    employees.splice(idx, 1)
    return HttpResponse.json({ success: true })
  }),
]
