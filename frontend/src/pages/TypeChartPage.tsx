import TypeCard from '../components/TypeCard'
import { TYPES, TYPE_ORDER } from '../data/types'

function TypeChartPage() {
  return (
    <div data-testid="type-chart-grid" className="h-full grid grid-cols-3 auto-rows-fr gap-3 p-4">
      {TYPE_ORDER.map((id) => (
        <TypeCard key={id} type={TYPES[id]} />
      ))}
    </div>
  )
}

export default TypeChartPage
