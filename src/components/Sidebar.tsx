import { NavLink } from 'react-router-dom'

const navItems = [
  { icon: '🏠', label: 'Dashboard',    to: '/' },
  { icon: '👤', label: 'Profile', to: '/profile' },
  { icon: '🏢', label: 'Companies',    to: '/companies' },
  { icon: '👥', label: 'People',       to: '/people' },
  { icon: '📨', label: 'Outreach',     to: '/outreach' },
  { icon: '📋', label: 'Applications', to: '/applications' },
  { icon: '⚙️', label: 'Settings',     to: '/settings' },
]

const Sidebar = () => {
  return (
    <aside className="w-60 shrink-0 flex flex-col h-full border-r border-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center text-white text-xs font-bold select-none">
          CC
        </div>
        <span className="font-semibold text-sm text-foreground tracking-tight">CareerCopilot</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              ].join(' ')
            }
          >
            <span className="text-base leading-none">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-2xs text-muted-foreground">v0.1.0 · MVP</p>
      </div>
    </aside>
  )
}

export default Sidebar