import { Car, Activity, Gauge, Users } from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStats } from '@/hooks/useStats'

const PIE_COLORS = ['#818cf8', '#34d399', '#fbbf24']
const CHART_TOOLTIP_STYLE = {
  background: 'oklch(0.16 0.014 265)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: 'oklch(0.96 0.005 265)',
  fontSize: '13px',
}

export function DashboardPage() {
  const { data, isLoading } = useStats()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">儀表板</h2>
        <p className="mt-1 text-sm text-muted-foreground">車輛與人員管理概覽</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="車輛總數"   value={data?.totalVehicles}  icon={Car}      loading={isLoading} accent="indigo"  />
        <StatCard title="使用中車輛" value={data?.activeVehicles} icon={Activity} loading={isLoading} accent="emerald" />
        <StatCard title="閒置車輛"   value={data?.idleVehicles}   icon={Gauge}    loading={isLoading} accent="amber"   />
        <StatCard title="員工總數"   value={data?.totalEmployees} icon={Users}    loading={isLoading} accent="violet"  />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">車輛狀態分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data?.vehicleStatusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {data?.vehicleStatusDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">月度車輛使用趨勢</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.monthlyUsage} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="count" name="使用數量" fill="#818cf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
