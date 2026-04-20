import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

function renderWithRouter(initialEntries: string[]): void {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  )
}

describe('Layout', () => {
  it('renders home without back button', () => {
    renderWithRouter(['/'])
    expect(screen.queryByRole('button', { name: /back/i })).toBeNull()
  })

  it('renders bottom nav with four tabs', () => {
    renderWithRouter(['/'])
    expect(screen.getByText('홈')).toBeInTheDocument()
    expect(screen.getByText('상성표')).toBeInTheDocument()
    expect(screen.getByText('퀴즈')).toBeInTheDocument()
    expect(screen.getByText('설정')).toBeInTheDocument()
  })

  it('shows back button on non-home route', () => {
    renderWithRouter(['/type-chart'])
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
  })

  it('back button navigates back', async () => {
    const user = userEvent.setup()
    renderWithRouter(['/', '/quiz'])
    const backButton = screen.getByRole('button', { name: /back/i })
    await user.click(backButton)
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('bottom nav links have correct href', () => {
    renderWithRouter(['/'])
    const homeLink: HTMLAnchorElement = screen.getByText('홈').closest('a') as HTMLAnchorElement
    const typeChartLink: HTMLAnchorElement = screen.getByText('상성표').closest('a') as HTMLAnchorElement
    const quizLink: HTMLAnchorElement = screen.getByText('퀴즈').closest('a') as HTMLAnchorElement
    const settingsLink: HTMLAnchorElement = screen.getByText('설정').closest('a') as HTMLAnchorElement

    expect(homeLink).toHaveAttribute('href', '/')
    expect(typeChartLink).toHaveAttribute('href', '/type-chart')
    expect(quizLink).toHaveAttribute('href', '/quiz')
    expect(settingsLink).toHaveAttribute('href', '/settings')
  })

  it('bottom nav is fixed to the viewport bottom', () => {
    renderWithRouter(['/'])
    const nav: HTMLElement = screen.getByText('홈').closest('nav') as HTMLElement
    expect(nav).toHaveClass('fixed', 'bottom-0')
  })

  it('main has padding-bottom to avoid being covered by bottom nav', () => {
    renderWithRouter(['/'])
    const main: HTMLElement = document.querySelector('main') as HTMLElement
    expect(main).toHaveClass('pb-14')
  })

  it('home tab link contains nav-icon-home', () => {
    renderWithRouter(['/'])
    const homeLink = screen.getByText('홈').closest('a') as HTMLAnchorElement
    expect(homeLink.querySelector('[data-testid="nav-icon-home"]')).toBeInTheDocument()
  })

  it('type-chart tab link contains nav-icon-type-chart', () => {
    renderWithRouter(['/'])
    const typeChartLink = screen.getByText('상성표').closest('a') as HTMLAnchorElement
    expect(typeChartLink.querySelector('[data-testid="nav-icon-type-chart"]')).toBeInTheDocument()
  })

  it('quiz tab link contains nav-icon-quiz', () => {
    renderWithRouter(['/'])
    const quizLink = screen.getByText('퀴즈').closest('a') as HTMLAnchorElement
    expect(quizLink.querySelector('[data-testid="nav-icon-quiz"]')).toBeInTheDocument()
  })

  it('settings tab link contains nav-icon-settings', () => {
    renderWithRouter(['/'])
    const settingsLink = screen.getByText('설정').closest('a') as HTMLAnchorElement
    expect(settingsLink.querySelector('[data-testid="nav-icon-settings"]')).toBeInTheDocument()
  })
})
