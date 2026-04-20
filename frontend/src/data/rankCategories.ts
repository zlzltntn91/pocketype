import type { TypeId } from './types'
import { TYPES, TYPE_ORDER, rankLeaders } from './types'

const LEADERS = rankLeaders()

export interface CategorySpec {
  ids: TypeId[]
  label: string
}

const NO_EFFECT_POSITIVE: TypeId[] = TYPE_ORDER.filter(
  (id) => TYPES[id].offense.noEffect.length === 0 || TYPES[id].defense.immuneTo.length > 0,
)

export const POSITIVE_CATEGORIES: CategorySpec[] = [
  { ids: LEADERS.strength.max, label: '강점↑' },
  { ids: LEADERS.halfDamage.min, label: '반감↓' },
  { ids: NO_EFFECT_POSITIVE, label: '무효↓' },
  { ids: LEADERS.weakness.min, label: '약점↓' },
  { ids: LEADERS.resist.max, label: '저항↑' },
  { ids: LEADERS.immune.max, label: '면역↑' },
]

export const NEGATIVE_CATEGORIES: CategorySpec[] = [
  { ids: LEADERS.strength.min, label: '강점↓' },
  { ids: LEADERS.halfDamage.max, label: '반감↑' },
  { ids: LEADERS.noEffect.max, label: '무효↑' },
  { ids: LEADERS.weakness.max, label: '약점↑' },
  { ids: LEADERS.resist.min, label: '저항↓' },
  { ids: LEADERS.immune.min, label: '면역↓' },
]

export function collectLabels(categories: CategorySpec[], id: TypeId): string[] {
  return categories.filter((c) => c.ids.includes(id)).map((c) => c.label)
}
