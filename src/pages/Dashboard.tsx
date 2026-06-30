// ─── Mock data ────────────────────────────────────────────────────────────────

const stats = [
  {
    label: 'Jobs Found',
    value: '248',
    change: '+12 this week',
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    accent: 'text-violet-600 bg-violet-50',
  },
  {
    label: 'Companies Saved',
    value: '34',
    change: '+5 this week',
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <path d="M3 21h18M9 8h1m-1 4h1m4-4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
      </svg>
    ),
    accent: 'text-blue-600 bg-blue-50',
  },
  {
    label: 'People Found',
    value: '91',
    change: '+8 this week',
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    accent: 'text-emerald-600 bg-emerald-50',
  },
  {
    label: 'Outreach Sent',
    value: '17',
    change: '-2 vs last week',
    up: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
    accent: 'text-amber-600 bg-amber-50',
  },
]

const recentActivity = [
  { id: 1, type: 'job',      text: 'New job match: Senior Frontend Engineer at Vercel',  time: '2m ago',    dot: 'bg-violet-500' },
  { id: 2, type: 'outreach', text: 'Outreach sent to Sarah Kim · Head of Engineering',   time: '1h ago',    dot: 'bg-blue-500' },
  { id: 3, type: 'company',  text: 'Saved Linear to your companies list',                time: '3h ago',    dot: 'bg-emerald-500' },
  { id: 4, type: 'interview',text: 'Interview scheduled with Notion · Tuesday 2pm',      time: 'Yesterday', dot: 'bg-amber-500' },
  { id: 5, type: 'outreach', text: 'Follow-up sent to Alex Chen · Stripe Recruiting',    time: 'Yesterday', dot: 'bg-blue-500' },
  { id: 6, type: 'job',      text: 'Applied to Staff Engineer at Loom',                  time: '2d ago',    dot: 'bg-violet-500' },
]

const savedCompanies = [
  { id: 1, name: 'Vercel', stage: 'Series C', industry: 'Dev Tools',    hiring: true,  logo: 'V' },
  { id: 2, name: 'Linear', stage: 'Series B', industry: 'Productivity', hiring: true,  logo: 'L' },
  { id: 3, name: 'Notion', stage: 'Series C', industry: 'Productivity', hiring: true,  logo: 'N' },
  { id: 4, name: 'Retool', stage: 'Series C', industry: 'Dev Tools',    hiring: false, logo: 'R' },
  { id: 5, name: 'Loom',   stage: 'Acquired', industry: 'Video',        hiring: false, logo: 'L' },
]

const recentOutreach = [
  { id: 1, name: 'Sarah Kim',   role: 'Head of Engineering', company: 'Vercel', status: 'Replied',  statusColor: 'text-emerald-600 bg-emerald-50' },
  { id: 2, name: 'Alex Chen',   role: 'Recruiter',           company: 'Stripe', status: 'Sent',     statusColor: 'text-blue-600 bg-blue-50' },
  { id: 3, name: 'Jamie Patel', role: 'Hiring Manager',      company: 'Linear', status: 'Sent',     statusColor: 'text-blue-600 bg-blue-50' },
  { id: 4, name: 'Morgan Lee',  role: 'Founder',             company: 'Loom',   status: 'No reply', statusColor: 'text-muted-foreground bg-muted' },
]

const upcomingInterviews = [
  { id: 1, company: 'Notion', role: 'Senior Engineer',   round: 'Technical',    date: 'Tue 14 Jan', time: '2:00 PM',  logo: 'N' },
  { id: 2, company: 'Vercel', role: 'Staff Engineer',    round: 'System Design',date: 'Thu 16 Jan', time: '11:00 AM', logo: 'V' },
  { id: 3, company: 'Linear', role: 'Frontend Engineer', round: 'Culture Fit',  date: 'Fri 17 Jan', time: '3:30 PM',  logo: 'L' },
]

const quickActions = [
  {
    label: 'Search Jobs',
    description: 'Find matching opportunities',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    color: 'text-violet-600 bg-violet-50 hover:bg-violet-100',
  },
  {
    label: 'Research Company',
    description: 'AI-powered insights',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M3 21h18M9 8h1m-1 4h1m4-4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
      </svg>
    ),
    color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
  },
  {
    label: 'Generate Outreach',
    description: 'Write a personalised message',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
    color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
  },
  {
    label: 'Upload Resume',
    description: 'Parse & extract your profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    color: 'text-amber-600 bg-amber-50 hover:bg-amber-100',
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

const SectionHeader = ({ title, action }: { title: string; action?: string }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-sm font-semibold text-foreground">{title}</h2>
    {action && (
      <button className="text-xs text-brand hover:underline font-medium transition-colors">
        {action}
      </button>
    )}
  </div>
)

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-full bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">AI Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-6 space-y-6">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                <span className={`p-1.5 rounded-md ${s.accent}`}>{s.icon}</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
              <p className={`mt-1 text-xs font-medium ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                {s.change}
              </p>
            </div>
          ))}
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <SectionHeader title="Quick Actions" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-brand/30 hover:shadow-sm"
              >
                <span className={`p-2 rounded-lg shrink-0 transition-colors ${a.color}`}>
                  {a.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{a.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{a.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Middle row: Activity + Outreach ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Recent Activity */}
          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Recent Activity" action="View all" />
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0">
                    <span className={`block w-2 h-2 rounded-full ${item.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Outreach */}
          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Recent Outreach" action="View all" />
            <div className="space-y-3">
              {recentOutreach.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-none">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {item.role} · {item.company}
                    </p>
                  </div>
                  <span className={`shrink-0 text-2xs font-medium px-2 py-1 rounded-md ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom row: Companies + Interviews ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Saved Companies */}
          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Saved Companies" action="View all" />
            <div className="space-y-2.5">
              {savedCompanies.map((co) => (
                <div key={co.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {co.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-none">{co.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{co.industry} · {co.stage}</p>
                  </div>
                  <span className={`shrink-0 text-2xs font-medium px-2 py-1 rounded-md ${co.hiring ? 'text-emerald-600 bg-emerald-50' : 'text-muted-foreground bg-muted'}`}>
                    {co.hiring ? 'Hiring' : 'Not hiring'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Upcoming Interviews" action="View all" />
            <div className="space-y-3">
              {upcomingInterviews.map((iv) => (
                <div key={iv.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                  <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {iv.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-none">{iv.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{iv.role} · {iv.round}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-foreground">{iv.date}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{iv.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-1 py-2.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-brand/40 hover:text-brand transition-colors">
                + Add interview
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard