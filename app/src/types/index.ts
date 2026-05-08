export type Role = 'admin' | 'user'

export interface User {
  id: string
  username: string
  role: Role
  token: string
}

export type VehicleStatus = '使用中' | '閒置' | '維修中'

export interface Vehicle {
  id: string
  plateNumber: string
  model: string
  status: VehicleStatus
  assignedEmployeeId?: string
  assignedEmployeeName?: string
  updatedAt: string
}

export interface Employee {
  id: string
  name: string
  title: string
  department: string
  email: string
  phone?: string
}

export interface Stats {
  totalVehicles: number
  activeVehicles: number
  idleVehicles: number
  totalEmployees: number
  vehicleStatusDistribution: { name: string; value: number }[]
  monthlyUsage: { month: string; count: number }[]
}
