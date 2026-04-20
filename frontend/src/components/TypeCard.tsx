import { Link } from 'react-router-dom'
import type { TypeId, TypeInfo } from '../data/types'
import { rankLeaders } from '../data/types'
import { TYPE_BG } from '../data/typeColors'

interface TypeCardProps {
  type: TypeInfo
}

const LEADERS = rankLeaders()

interface RankBadgeSpec {
  testId: string
  ids: TypeId[]
  label: string
}

const BADGE_SPECS: RankBadgeSpec[] = [
  { testId: 'rank-badge-strength-max', ids: LEADERS.strength.max, label: '👍 강점 최다' },
  { testId: 'rank-badge-strength-min', ids: LEADERS.strength.min, label: '👎 강점 최소' },
  { testId: 'rank-badge-half-damage-max', ids: LEADERS.halfDamage.max, label: '👎 반감 최다' },
  { testId: 'rank-badge-half-damage-min', ids: LEADERS.halfDamage.min, label: '👍 반감 최소' },
  { testId: 'rank-badge-no-effect-max', ids: LEADERS.noEffect.max, label: '👎 무효 최다' },
  { testId: 'rank-badge-no-effect-min', ids: LEADERS.noEffect.min, label: '👍 무효 최소' },
  { testId: 'rank-badge-weakness-max', ids: LEADERS.weakness.max, label: '👎 약점 최다' },
  { testId: 'rank-badge-weakness-min', ids: LEADERS.weakness.min, label: '👍 약점 최소' },
  { testId: 'rank-badge-resist-max', ids: LEADERS.resist.max, label: '👍 저항 최다' },
  { testId: 'rank-badge-resist-min', ids: LEADERS.resist.min, label: '👎 저항 최소' },
  { testId: 'rank-badge-immune-max', ids: LEADERS.immune.max, label: '👍 면역 최다' },
  { testId: 'rank-badge-immune-min', ids: LEADERS.immune.min, label: '👎 면역 최소' },
]

function TypeCard({ type }: TypeCardProps) {
  const id = type.id
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
          {BADGE_SPECS.map((spec) =>
            spec.ids.includes(id) ? (
              <span
                key={spec.testId}
                data-testid={spec.testId}
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]"
              >
                {spec.label}
              </span>
            ) : null,
          )}
        </div>
      </Link>
    </div>
  )
}

export default TypeCard
