import { Link, useParams } from 'react-router-dom'
import type { TypeId } from '../data/types'
import { TYPES, TYPE_ORDER, offenseScore, defenseScore, rankLeaders } from '../data/types'
import { TYPE_BG, typeFg } from '../data/typeColors'

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

function isTypeId(value: string | undefined): value is TypeId {
  return typeof value === 'string' && (TYPE_ORDER as readonly string[]).includes(value)
}

function TypeChip({ id, currentTypeId }: { id: TypeId; currentTypeId: TypeId }) {
  const chip = (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: TYPE_BG[id], color: typeFg(id) }}
    >
      <img src={TYPES[id].iconPath} alt="" className="h-3.5 w-3.5" />
      {TYPES[id].nameKo}
    </span>
  )
  if (id === currentTypeId) return chip
  return <Link to={`/type-chart/${id}`}>{chip}</Link>
}

function TypeList({ ids, currentTypeId }: { ids: TypeId[]; currentTypeId: TypeId }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <TypeChip key={id} id={id} currentTypeId={currentTypeId} />
      ))}
    </div>
  )
}

interface SectionProps {
  testId: string
  label: string
  multiplier: string
  ids: TypeId[]
  currentTypeId: TypeId
}

function Section({ testId, label, multiplier, ids, currentTypeId }: SectionProps) {
  if (ids.length === 0) return null
  return (
    <section
      data-testid={testId}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <h2 className="mb-3 flex items-baseline justify-between text-sm font-semibold text-[var(--text-muted)]">
        <span>{label}</span>
        <span className="text-xs">{multiplier}</span>
      </h2>
      <TypeList ids={ids} currentTypeId={currentTypeId} />
    </section>
  )
}

function TypeDetailPage() {
  const { typeId } = useParams()

  if (!isTypeId(typeId)) {
    return (
      <div className="p-4 text-[var(--text-muted)]">타입을 찾을 수 없습니다</div>
    )
  }

  const type = TYPES[typeId]

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex items-center gap-3">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: TYPE_BG[typeId] }}
        >
          <img src={type.iconPath} alt="" className="h-9 w-9" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[var(--text)]">{type.nameKo}</h1>
          <div className="flex gap-3 text-xs text-[var(--text-muted)]">
            <span data-testid="detail-offense-score">공 {String(offenseScore(typeId))}</span>
            <span data-testid="detail-defense-score">방 {String(defenseScore(typeId))}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {BADGE_SPECS.map((spec) =>
              spec.ids.includes(typeId) ? (
                <span
                  key={spec.testId}
                  data-testid={spec.testId}
                  className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
                >
                  {spec.label}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </header>

      <div
        data-testid="offense-group"
        className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4"
      >
        <h2 className="text-sm font-semibold text-[var(--text-muted)]">공격 시</h2>
        <Section testId="super-effective" label="효과가 굉장하다" multiplier="×2" ids={type.offense.superEffective} currentTypeId={typeId} />
        <Section testId="not-very-effective" label="효과가 별로인 것 같다" multiplier="×0.5" ids={type.offense.notVeryEffective} currentTypeId={typeId} />
        <Section testId="no-effect" label="효과가 없는 것 같다" multiplier="×0" ids={type.offense.noEffect} currentTypeId={typeId} />
      </div>

      <div
        data-testid="defense-group"
        className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4"
      >
        <h2 className="text-sm font-semibold text-[var(--text-muted)]">방어 시</h2>
        <Section testId="weak-to" label="약점" multiplier="×2" ids={type.defense.weakTo} currentTypeId={typeId} />
        <Section testId="resist-to" label="저항" multiplier="×0.5" ids={type.defense.resistTo} currentTypeId={typeId} />
        <Section testId="immune-to" label="면역" multiplier="×0" ids={type.defense.immuneTo} currentTypeId={typeId} />
      </div>
    </div>
  )
}

export default TypeDetailPage
