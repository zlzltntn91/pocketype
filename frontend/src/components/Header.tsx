import { useLocation, useNavigate } from 'react-router-dom'
import type { TypeId } from '../data/types'
import { TYPES, TYPE_ORDER } from '../data/types'

const STATIC_TITLES: Record<string, string> = {
  '/type-chart': '상성표',
  '/quiz': '퀴즈',
  '/settings': '설정',
}

function resolveTitle(pathname: string): string {
  const detail = pathname.match(/^\/type-chart\/([^/]+)$/)
  if (detail) {
    const id = detail[1] as TypeId
    if ((TYPE_ORDER as readonly string[]).includes(id)) {
      return `${TYPES[id].nameKo} 상성`
    }
    return '상성표'
  }
  return STATIC_TITLES[pathname] ?? ''
}

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const title = resolveTitle(location.pathname)

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-3">
      <div className="w-9">
        {!isHome && (
          <button
            type="button"
            aria-label="back"
            onClick={() => navigate(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text)] hover:bg-[var(--surface)] active:bg-[var(--border)]"
          >
            ←
          </button>
        )}
      </div>
      <h1 className="flex-1 text-center text-base font-semibold text-[var(--text)]">{title}</h1>
      <div className="w-9" />
    </header>
  )
}

export default Header
