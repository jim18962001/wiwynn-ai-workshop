import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { vehicleHandlers } from './handlers/vehicles'
import { employeeHandlers } from './handlers/employees'
import { statsHandlers } from './handlers/stats'

export const worker = setupWorker(
  ...authHandlers,
  ...vehicleHandlers,
  ...employeeHandlers,
  ...statsHandlers,
)
