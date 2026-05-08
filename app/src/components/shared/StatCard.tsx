import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { LucideIcon } from 'lucide-react'

type AccentColor = 'indigo' | 'emerald' | 'amber' | 'violet'

const accentMap: Record<AccentColor, { border: string; bg: string; text: string }> = {
  indigo:  { border: 'border-indigo-500/20',  bg: 'bg-indigo-500/10',  text: 'text-indigo-400'  },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  amber:   { border: 'border-amber-500/20',   bg: 'bg-amber-500/10',   text: 'text-amber-400'   },
  violet:  { border: 'border-violet-500/20',  bg: 'bg-violet-500/10',  text: 'text-violet-400'  },
}

interface StatCardProps {
  title: string
  value: number | undefined
  icon: LucideIcon
  loading?: boolean
  accent?: AccentColor
}

export function StatCard({ title, value, icon: Icon, loading, accent = 'indigo' }: StatCardProps) {
  const { border, bg, text } = accentMap[accent]
  return (
    <Card className={`border ${border} transition-all duration-300 hover:shadow-lg hover:shadow-black/20`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
          <Icon className={`h-4 w-4 ${text}`} />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <p className="text-3xl font-bold tracking-tight">{value ?? 0}</p>
        )}
      </CardContent>
    </Card>
  )
}
