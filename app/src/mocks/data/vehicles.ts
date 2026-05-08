import type { Vehicle } from '@/types'

export const vehiclesData: Vehicle[] = [
  { id: '1', plateNumber: 'ABC-1234', model: 'Toyota Camry', status: '使用中', assignedEmployeeId: '1', assignedEmployeeName: '王大明', updatedAt: '2026-05-01' },
  { id: '2', plateNumber: 'XYZ-5678', model: 'Honda CRV', status: '閒置', updatedAt: '2026-05-02' },
  { id: '3', plateNumber: 'DEF-9012', model: 'Ford Focus', status: '維修中', updatedAt: '2026-04-28' },
  { id: '4', plateNumber: 'GHI-3456', model: 'Toyota RAV4', status: '使用中', assignedEmployeeId: '2', assignedEmployeeName: '李小華', updatedAt: '2026-05-03' },
  { id: '5', plateNumber: 'JKL-7890', model: 'Hyundai Tucson', status: '閒置', updatedAt: '2026-05-01' },
  { id: '6', plateNumber: 'MNO-2345', model: 'Mazda CX-5', status: '使用中', assignedEmployeeId: '3', assignedEmployeeName: '張三', updatedAt: '2026-05-04' },
  { id: '7', plateNumber: 'PQR-6789', model: 'Nissan Altima', status: '閒置', updatedAt: '2026-04-30' },
  { id: '8', plateNumber: 'STU-0123', model: 'Toyota Corolla', status: '維修中', updatedAt: '2026-04-25' },
  { id: '9', plateNumber: 'VWX-4567', model: 'Honda Accord', status: '使用中', assignedEmployeeId: '4', assignedEmployeeName: '陳小玲', updatedAt: '2026-05-05' },
  { id: '10', plateNumber: 'YZA-8901', model: 'Kia Sportage', status: '閒置', updatedAt: '2026-05-02' },
]
