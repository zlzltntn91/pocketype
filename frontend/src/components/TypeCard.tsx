import { Link } from 'react-router-dom'
import type { TypeInfo } from '../data/types'
import { POSITIVE_CATEGORIES, NEGATIVE_CATEGORIES, collectLabels } from '../data/rankCategories'
import { TYPE_BG } from '../data/typeColors'

interface TypeCardProps {
  type: TypeInfo
}

function TypeCard({ type }: TypeCardProps) {
  const id = type.id
  const positiveLabels: string[] = collectLabels(POSITIVE_CATEGORIES, id)
  const negativeLabels: string[] = collectLabels(NEGATIVE_CATEGORIES, id)
  return (
    <div data-testid="type-card" data-type={id}>
      <Link
        to={`/type-chart/${id}`}
        className="flex h-full flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] transition active:scale-95"
      >
        <div
          data-testid="icon-circle"
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: TYPE_BG[id] }}
        >
          <img src={type.iconPath} alt="" className="h-8 w-8" />
        </div>
        <span className="text-sm font-medium">{type.nameKo}</span>
        <div data-testid="rank-badge-container" className="mt-auto flex flex-wrap justify-center gap-1">
          {positiveLabels.length > 0 ? (
            <span
              data-testid="rank-badge-positive"
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]"
            >
              {`👍 ${positiveLabels.join(', ')}`}
            </span>
          ) : null}
          {negativeLabels.length > 0 ? (
            <span
              data-testid="rank-badge-negative"
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]"
            >
              {`👎 ${negativeLabels.join(', ')}`}
            </span>
          ) : null}
        </div>
      </Link>
    </div>
  )
}

export default TypeCard
