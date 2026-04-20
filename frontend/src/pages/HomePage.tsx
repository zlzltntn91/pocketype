function HomePage() {
  return (
    <section data-testid="home-page" className="flex flex-col gap-2 p-4">
      <h2 className="text-lg font-semibold text-[var(--text)]">포켓몬 타입 상성</h2>
      <p className="text-sm text-[var(--text-muted)]">
        하단 메뉴에서 상성표를 탐색하거나 퀴즈로 실력을 점검하세요.
      </p>
    </section>
  )
}

export default HomePage
