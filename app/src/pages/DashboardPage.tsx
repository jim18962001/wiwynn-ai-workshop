import { Car, Activity, Gauge, Users } from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStats } from '@/hooks/useStats'

const PIE_COLORS = ['#6366f1', '#22c55e', '#f59e0b']

export function DashboardPage() {
  const { data, isLoading } = useStats()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">儀表板</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="車輛總數" value={data?.totalVehicles} icon={Car} loading={isLoading} />
        <StatCard title="使用中車輛" value={data?.activeVehicles} icon={Activity} loading={isLoading} />
        <StatCard title="閒置車輛" value={data?.idleVehicles} icon={Gauge} loading={isLoading} />
        <StatCard title="員工總數" value={data?.totalEmployees} icon={Users} loading={isLoading} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>車輛狀態分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={data?.vehicleStatusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {data?.vehicleStatusDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>月度車輛使用趨勢</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.monthlyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="使用數量" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
