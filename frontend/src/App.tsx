import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TypeChartPage from './pages/TypeChartPage'
import TypeDetailPage from './pages/TypeDetailPage'
import QuizPage from './pages/QuizPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/type-chart">
          <Route index element={<TypeChartPage />} />
          <Route path=":typeId" element={<TypeDetailPage />} />
        </Route>
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
