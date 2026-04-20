import { useState } from 'react'
import type { Theme } from '../theme'
import { applyTheme, loadTheme } from '../theme'

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'system', label: '시스템' },
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
]

function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(loadTheme())

  const choose = (next: Theme): void => {
    setTheme(next)
    applyTheme(next)
  }

  return (
    <section className="flex flex-col gap-3 p-4">
      <h2 className="text-sm font-semibold text-[var(--text-muted)]">테마</h2>
      <div
        role="radiogroup"
        aria-label="테마 선택"
        className="flex gap-2 rounded-xl bg-[var(--surface-2)] p-1"
      >
        {OPTIONS.map((o) => {
          const active = theme === o.value
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(o.value)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                active
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        시스템을 선택하면 OS 설정을 따라갑니다.
      </p>
    </section>
  )
}

export default SettingsPage
