import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { TYPE_ORDER } from '../data/types'

function renderTypeChart(): void {
  render(
    <MemoryRouter initialEntries={['/type-chart']}>
      <App />
    </MemoryRouter>,
  )
}

describe('TypeCard layout consistency across type-chart grid', () => {
  it('all type-card root elements share identical className (no conditional layout divergence)', () => {
    renderTypeChart()

    const cards: HTMLElement[] = screen.getAllByTestId('type-card')
    expect(cards.length).toBe(TYPE_ORDER.length)

    const firstClassName: string = cards[0].className
    for (const card of cards) {
      expect(card.className).toBe(firstClassName)
    }
  })
})
