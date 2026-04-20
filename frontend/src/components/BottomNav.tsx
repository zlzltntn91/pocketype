import { NavLink } from 'react-router-dom'
import { Home, Sword, HelpCircle, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TabProps {
  to: string
  label: string
  icon: LucideIcon
  iconTestId: string
  end?: boolean
}

function Tab({ to, label, icon: Icon, iconTestId, end }: TabProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex flex-col flex-1 items-center justify-center text-xs py-2 ${
          isActive
            ? 'text-[var(--accent)] font-semibold'
            : 'text-[var(--text-muted)]'
        }`
      }
    >
      <span data-testid={iconTestId}>
        <Icon size={20} />
      </span>
      {label}
    </NavLink>
  )
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-14 border-t border-[var(--border)] bg-[var(--surface-2)]">
      <Tab to="/" label="홈" icon={Home} iconTestId="nav-icon-home" end />
      <Tab to="/type-chart" label="상성표" icon={Sword} iconTestId="nav-icon-type-chart" />
      <Tab to="/quiz" label="퀴즈" icon={HelpCircle} iconTestId="nav-icon-quiz" />
      <Tab to="/settings" label="설정" icon={Settings} iconTestId="nav-icon-settings" />
    </nav>
  )
}

export default BottomNav
