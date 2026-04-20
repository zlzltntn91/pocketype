import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import {
  TYPES,
  TYPE_ORDER,
  hasOffenseImmunity,
  hasDefenseImmunity,
  offenseScore,
  defenseScore,
  rankLeaders,
} from '../data/types'

const RANK_BADGE_TEST_IDS: string[] = [
  'rank-badge-strength-max',
  'rank-badge-strength-min',
  'rank-badge-half-damage-max',
  'rank-badge-half-damage-min',
  'rank-badge-no-effect-max',
  'rank-badge-no-effect-min',
  'rank-badge-weakness-max',
  'rank-badge-weakness-min',
  'rank-badge-resist-max',
  'rank-badge-resist-min',
  'rank-badge-immune-max',
  'rank-badge-immune-min',
]

function renderWithRouter(initialEntries: string[]): void {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  )
}

describe('TypeChart list page', () => {
  it('renders 18 type cards', () => {
    renderWithRouter(['/type-chart'])

    const cards: HTMLElement[] = screen.getAllByTestId('type-card')
    expect(cards).toHaveLength(18)

    for (const id of TYPE_ORDER) {
      const nameKo: string = TYPES[id].nameKo
      expect(screen.getByText(nameKo)).toBeInTheDocument()
    }
  })

  it('type cards do not render immunity badges', () => {
    renderWithRouter(['/type-chart'])

    const cards: HTMLElement[] = screen.getAllByTestId('type-card')
    for (const card of cards) {
      expect(within(card).queryByTestId('immunity-badges')).toBeNull()
      expect(within(card).queryByTestId('offense-immunity-badge')).toBeNull()
      expect(within(card).queryByTestId('defense-immunity-badge')).toBeNull()
    }
  })

  it('card links to detail route', () => {
    renderWithRouter(['/type-chart'])

    const fireCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fire"]',
    ) as HTMLElement
    const link: HTMLAnchorElement = within(fireCard).getByRole('link') as HTMLAnchorElement
    expect(link).toHaveAttribute('href', '/type-chart/fire')
  })

  it('type-chart-grid has h-full class', () => {
    renderWithRouter(['/type-chart'])

    const grid: HTMLElement = screen.getByTestId('type-chart-grid')
    expect(grid).toHaveClass('h-full')
  })

  it('type cards render in generation order', () => {
    renderWithRouter(['/type-chart'])

    const expectedOrder: string[] = [
      'normal', 'fire', 'water', 'grass', 'electric', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
    ]

    const cards: HTMLElement[] = screen.getAllByTestId('type-card')
    const actualOrder: (string | null)[] = cards.map((c) => c.getAttribute('data-type'))
    expect(actualOrder).toEqual(expectedOrder)
  })

  it('type-card no longer shows offense/defense score badges', () => {
    renderWithRouter(['/type-chart'])

    const cards: HTMLElement[] = screen.getAllByTestId('type-card')
    for (const card of cards) {
      expect(within(card).queryByTestId('offense-score')).toBeNull()
      expect(within(card).queryByTestId('defense-score')).toBeNull()
    }

    const fireCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fire"]',
    ) as HTMLElement
    expect(fireCard).not.toBeNull()
    expect(within(fireCard).queryByTestId('offense-score')).toBeNull()
    expect(within(fireCard).queryByTestId('defense-score')).toBeNull()
  })

  it('type-card shows max and min rank badges', () => {
    renderWithRouter(['/type-chart'])

    const fightingCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fighting"]',
    ) as HTMLElement
    expect(fightingCard).not.toBeNull()
    expect(within(fightingCard).getByTestId('rank-badge-strength-max')).toBeInTheDocument()
    expect(within(fightingCard).getByTestId('rank-badge-no-effect-max')).toBeInTheDocument()

    const normalCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="normal"]',
    ) as HTMLElement
    expect(normalCard).not.toBeNull()
    expect(within(normalCard).getByTestId('rank-badge-strength-min')).toBeInTheDocument()
    expect(within(normalCard).getByTestId('rank-badge-no-effect-max')).toBeInTheDocument()
    expect(within(normalCard).getByTestId('rank-badge-weakness-min')).toBeInTheDocument()
    expect(within(normalCard).getByTestId('rank-badge-resist-min')).toBeInTheDocument()

    const steelCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="steel"]',
    ) as HTMLElement
    expect(steelCard).not.toBeNull()
    expect(within(steelCard).getByTestId('rank-badge-resist-max')).toBeInTheDocument()
    expect(within(steelCard).getByTestId('rank-badge-no-effect-min')).toBeInTheDocument()

    const ghostCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="ghost"]',
    ) as HTMLElement
    expect(ghostCard).not.toBeNull()
    expect(within(ghostCard).getByTestId('rank-badge-no-effect-max')).toBeInTheDocument()
    expect(within(ghostCard).getByTestId('rank-badge-immune-max')).toBeInTheDocument()
    expect(within(ghostCard).getByTestId('rank-badge-half-damage-min')).toBeInTheDocument()

    const grassCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="grass"]',
    ) as HTMLElement
    expect(grassCard).not.toBeNull()
    expect(within(grassCard).getByTestId('rank-badge-half-damage-max')).toBeInTheDocument()
    expect(within(grassCard).getByTestId('rank-badge-weakness-max')).toBeInTheDocument()
    expect(within(grassCard).getByTestId('rank-badge-no-effect-min')).toBeInTheDocument()

    const fireCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fire"]',
    ) as HTMLElement
    expect(fireCard).not.toBeNull()
    expect(within(fireCard).getByTestId('rank-badge-no-effect-min')).toBeInTheDocument()
  })

  it('type-card labels include thumbs emoji by direction', () => {
    renderWithRouter(['/type-chart'])

    const fightingCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fighting"]',
    ) as HTMLElement
    expect(fightingCard).not.toBeNull()
    expect(
      within(fightingCard).getByTestId('rank-badge-strength-max').textContent,
    ).toContain('👍')

    const ghostCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="ghost"]',
    ) as HTMLElement
    expect(ghostCard).not.toBeNull()
    expect(
      within(ghostCard).getByTestId('rank-badge-immune-max').textContent,
    ).toContain('👍')

    const normalCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="normal"]',
    ) as HTMLElement
    expect(normalCard).not.toBeNull()
    expect(
      within(normalCard).getByTestId('rank-badge-weakness-min').textContent,
    ).toContain('👍')

    expect(
      within(normalCard).getByTestId('rank-badge-strength-min').textContent,
    ).toContain('👎')

    const grassCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="grass"]',
    ) as HTMLElement
    expect(grassCard).not.toBeNull()
    expect(
      within(grassCard).getByTestId('rank-badge-half-damage-max').textContent,
    ).toContain('👎')

    expect(
      within(normalCard).getByTestId('rank-badge-resist-min').textContent,
    ).toContain('👎')
  })

  it('type-chart grid has auto-rows-fr', () => {
    renderWithRouter(['/type-chart'])

    const grid: HTMLElement = screen.getByTestId('type-chart-grid')
    expect(grid).toHaveClass('auto-rows-fr')
  })

  it('type-card link fills row with h-full', () => {
    renderWithRouter(['/type-chart'])

    const fireCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fire"]',
    ) as HTMLElement
    expect(fireCard).not.toBeNull()
    const fireLink: HTMLAnchorElement = within(fireCard).getByRole('link') as HTMLAnchorElement
    expect(fireLink).toHaveClass('h-full')

    const ghostCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="ghost"]',
    ) as HTMLElement
    expect(ghostCard).not.toBeNull()
    const ghostLink: HTMLAnchorElement = within(ghostCard).getByRole('link') as HTMLAnchorElement
    expect(ghostLink).toHaveClass('h-full')
  })

  it('rank-badge-container is always rendered and uses mt-auto', () => {
    renderWithRouter(['/type-chart'])

    const fireCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="fire"]',
    ) as HTMLElement
    expect(fireCard).not.toBeNull()
    const fireContainer: HTMLElement = within(fireCard).getByTestId('rank-badge-container')
    expect(fireContainer).toBeInTheDocument()
    expect(fireContainer).toHaveClass('mt-auto')

    const ghostCard: HTMLElement = document.querySelector(
      '[data-testid="type-card"][data-type="ghost"]',
    ) as HTMLElement
    expect(ghostCard).not.toBeNull()
    const ghostContainer: HTMLElement = within(ghostCard).getByTestId('rank-badge-container')
    expect(ghostContainer).toBeInTheDocument()
    expect(ghostContainer).toHaveClass('mt-auto')
  })
})

describe('TypeChart detail page', () => {
  it('detail does not render offense/defense toggle buttons', () => {
    renderWithRouter(['/type-chart/fire'])

    expect(screen.queryByRole('button', { name: '공격' })).toBeNull()
    expect(screen.queryByRole('button', { name: '방어' })).toBeNull()
  })

  it('detail shows offense relations', () => {
    renderWithRouter(['/type-chart/fire'])

    const superEffective: HTMLElement = screen.getByTestId('super-effective')
    expect(within(superEffective).getByText('벌레')).toBeInTheDocument()
    expect(within(superEffective).getByText('강철')).toBeInTheDocument()
    expect(within(superEffective).getByText('풀')).toBeInTheDocument()
    expect(within(superEffective).getByText('얼음')).toBeInTheDocument()
  })

  it('detail renders both offense and defense sections simultaneously', () => {
    renderWithRouter(['/type-chart/fire'])

    const superEffective: HTMLElement = screen.getByTestId('super-effective')
    const weakTo: HTMLElement = screen.getByTestId('weak-to')

    expect(superEffective).toBeInTheDocument()
    expect(weakTo).toBeInTheDocument()

    expect(within(weakTo).getByText('땅')).toBeInTheDocument()
    expect(within(weakTo).getByText('바위')).toBeInTheDocument()
    expect(within(weakTo).getByText('물')).toBeInTheDocument()
  })

  it('detail places offense sections above defense sections in DOM order', () => {
    renderWithRouter(['/type-chart/fire'])

    const superEffective: HTMLElement = screen.getByTestId('super-effective')
    const weakTo: HTMLElement = screen.getByTestId('weak-to')

    const position: number = superEffective.compareDocumentPosition(weakTo)
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })

  it('detail shows no-effect section only when non-empty', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/type-chart/fire']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.queryByTestId('no-effect')).toBeNull()
    unmount()

    render(
      <MemoryRouter initialEntries={['/type-chart/normal']}>
        <App />
      </MemoryRouter>,
    )
    const noEffect: HTMLElement = screen.getByTestId('no-effect')
    expect(within(noEffect).getByText('고스트')).toBeInTheDocument()
  })

  it('detail wraps offense sections in an offense-group container', () => {
    renderWithRouter(['/type-chart/fire'])

    const offenseGroup: HTMLElement = screen.getByTestId('offense-group')
    expect(offenseGroup).toBeInTheDocument()
    expect(within(offenseGroup).getByTestId('super-effective')).toBeInTheDocument()
    expect(within(offenseGroup).getByTestId('not-very-effective')).toBeInTheDocument()
  })

  it('detail wraps defense sections in a defense-group container', () => {
    renderWithRouter(['/type-chart/fire'])

    const defenseGroup: HTMLElement = screen.getByTestId('defense-group')
    expect(defenseGroup).toBeInTheDocument()
    expect(within(defenseGroup).getByTestId('weak-to')).toBeInTheDocument()
    expect(within(defenseGroup).getByTestId('resist-to')).toBeInTheDocument()
  })

  it('offense-group precedes defense-group in DOM order', () => {
    renderWithRouter(['/type-chart/fire'])

    const offenseGroup: HTMLElement = screen.getByTestId('offense-group')
    const defenseGroup: HTMLElement = screen.getByTestId('defense-group')

    const position: number = offenseGroup.compareDocumentPosition(defenseGroup)
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })

  it('detail section chips render in generation order', () => {
    renderWithRouter(['/type-chart/fire'])

    const superEffective: HTMLElement = screen.getByTestId('super-effective')
    const chipSpans: NodeListOf<HTMLSpanElement> =
      superEffective.querySelectorAll('span.inline-flex')
    const actualNames: string[] = Array.from(chipSpans).map(
      (s) => (s.textContent ?? '').trim(),
    )
    expect(actualNames).toEqual(['풀', '얼음', '벌레', '강철'])
  })

  it('detail chip navigates to target type detail', () => {
    renderWithRouter(['/type-chart/fire'])

    const superEffective: HTMLElement = screen.getByTestId('super-effective')
    const chip: HTMLElement = within(superEffective).getByText('풀')
    const link: HTMLAnchorElement | null = chip.closest('a')
    expect(link).not.toBeNull()
    expect(link).toHaveAttribute('href', '/type-chart/grass')
  })

  it('detail chip for self-type is not a link', () => {
    renderWithRouter(['/type-chart/fire'])

    const notVeryEffective: HTMLElement = screen.getByTestId('not-very-effective')
    const chip: HTMLElement = within(notVeryEffective).getByText('불꽃')
    expect(chip.closest('a')).toBeNull()
  })

  it('detail header shows offense and defense scores', () => {
    renderWithRouter(['/type-chart/fire'])

    expect(screen.getByTestId('detail-offense-score').textContent).toContain('4')
    expect(screen.getByTestId('detail-defense-score').textContent).toContain('0')
  })

  it('detail header shows negative scores with sign', () => {
    renderWithRouter(['/type-chart/dragon'])

    expect(screen.getByTestId('detail-offense-score').textContent).toContain('-1')
    expect(screen.getByTestId('detail-defense-score').textContent).toContain('-2')
  })

  it('detail header shows max and min rank badges', () => {
    const steelRender = render(
      <MemoryRouter initialEntries={['/type-chart/steel']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('rank-badge-resist-max')).toBeInTheDocument()
    expect(screen.getByTestId('rank-badge-no-effect-min')).toBeInTheDocument()
    steelRender.unmount()

    const ghostRender = render(
      <MemoryRouter initialEntries={['/type-chart/ghost']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('rank-badge-no-effect-max')).toBeInTheDocument()
    expect(screen.getByTestId('rank-badge-immune-max')).toBeInTheDocument()
    expect(screen.getByTestId('rank-badge-half-damage-min')).toBeInTheDocument()
    ghostRender.unmount()

    render(
      <MemoryRouter initialEntries={['/type-chart/normal']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('rank-badge-strength-min')).toBeInTheDocument()
    expect(screen.getByTestId('rank-badge-weakness-min')).toBeInTheDocument()
    expect(screen.getByTestId('rank-badge-resist-min')).toBeInTheDocument()
    expect(screen.getByTestId('rank-badge-no-effect-max')).toBeInTheDocument()
  })
})

describe('hasOffenseImmunity / hasDefenseImmunity helpers', () => {
  it('hasOffenseImmunity returns true for electric', () => {
    expect(hasOffenseImmunity('electric')).toBe(true)
  })

  it('hasOffenseImmunity returns false for fire', () => {
    expect(hasOffenseImmunity('fire')).toBe(false)
  })

  it('hasDefenseImmunity returns true for flying', () => {
    expect(hasDefenseImmunity('flying')).toBe(true)
  })

  it('hasDefenseImmunity returns false for fire', () => {
    expect(hasDefenseImmunity('fire')).toBe(false)
  })
})

describe('offenseScore / defenseScore helpers', () => {
  it('offenseScore returns -4 for normal', () => {
    expect(offenseScore('normal')).toBe(-4)
  })

  it('offenseScore returns 4 for fire', () => {
    expect(offenseScore('fire')).toBe(4)
  })

  it('offenseScore returns 1 for ghost', () => {
    expect(offenseScore('ghost')).toBe(1)
  })

  it('offenseScore returns -1 for dragon', () => {
    expect(offenseScore('dragon')).toBe(-1)
  })

  it('offenseScore returns 2 for steel', () => {
    expect(offenseScore('steel')).toBe(2)
  })

  it('defenseScore returns 0 for normal', () => {
    expect(defenseScore('normal')).toBe(0)
  })

  it('defenseScore returns 0 for fire', () => {
    expect(defenseScore('fire')).toBe(0)
  })

  it('defenseScore returns 2 for ghost', () => {
    expect(defenseScore('ghost')).toBe(2)
  })

  it('defenseScore returns -2 for dragon', () => {
    expect(defenseScore('dragon')).toBe(-2)
  })

  it('defenseScore returns 6 for steel', () => {
    expect(defenseScore('steel')).toBe(6)
  })
})

describe('rankLeaders helper', () => {
  it('strength max and min', () => {
    expect(rankLeaders().strength.max).toEqual(['fighting', 'ground'])
    expect(rankLeaders().strength.min).toEqual(['normal'])
  })

  it('halfDamage max and min', () => {
    expect(rankLeaders().halfDamage.max).toEqual(['grass', 'bug'])
    expect(rankLeaders().halfDamage.min).toEqual(['ghost', 'dragon'])
  })

  it('noEffect max and min', () => {
    expect(rankLeaders().noEffect.max).toEqual([
      'normal', 'electric', 'fighting', 'poison', 'ground', 'psychic', 'ghost', 'dragon',
    ])
    expect(rankLeaders().noEffect.min).toEqual([
      'fire', 'water', 'grass', 'ice', 'flying', 'bug', 'rock', 'dark', 'steel', 'fairy',
    ])
  })

  it('weakness max and min', () => {
    expect(rankLeaders().weakness.max).toEqual(['grass', 'rock'])
    expect(rankLeaders().weakness.min).toEqual(['normal', 'electric'])
  })

  it('resist max and min', () => {
    expect(rankLeaders().resist.max).toEqual(['steel'])
    expect(rankLeaders().resist.min).toEqual(['normal'])
  })

  it('immune max and min', () => {
    expect(rankLeaders().immune.max).toEqual(['ghost'])
    expect(rankLeaders().immune.min).toEqual([
      'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'flying',
      'psychic', 'bug', 'rock', 'dragon',
    ])
  })
})
