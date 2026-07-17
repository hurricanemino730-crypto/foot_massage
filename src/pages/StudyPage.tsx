import { useMemo, useState } from 'react'
import { FootDiagram } from '../components/FootDiagram'
import { PointDetailCard } from '../components/PointDetailCard'
import { categories, footPoints } from '../data/points'

export function StudyPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(footPoints[0]?.id ?? null)

  const filteredPoints = useMemo(
    () => (activeCategory ? footPoints.filter((p) => p.category === activeCategory) : footPoints),
    [activeCategory],
  )
  const highlightIds = useMemo(() => new Set(filteredPoints.map((p) => p.id)), [filteredPoints])
  const selectedPoint = selectedId ? footPoints.find((p) => p.id === selectedId) : undefined

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800 sm:p-6">
        <p className="mb-4 text-sm text-stone-500 dark:text-stone-400">
          カテゴリで絞り込むか、足裏図のツボを直接タップして位置を確認しましょう。
        </p>
        <FootDiagram selectedId={selectedId} highlightIds={highlightIds} onSelect={setSelectedId} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
          <p className="mb-2 text-sm font-medium text-stone-600 dark:text-stone-300">カテゴリ</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={
                'rounded-full border px-3 py-1 text-xs transition-colors ' +
                (activeCategory === null
                  ? 'border-teal-500 bg-teal-500 text-white'
                  : 'border-stone-300 text-stone-600 hover:border-teal-400 dark:border-stone-600 dark:text-stone-300')
              }
            >
              すべて({footPoints.length})
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={
                  'rounded-full border px-3 py-1 text-xs transition-colors ' +
                  (activeCategory === c
                    ? 'border-teal-500 bg-teal-500 text-white'
                    : 'border-stone-300 text-stone-600 hover:border-teal-400 dark:border-stone-600 dark:text-stone-300')
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-2 dark:border-stone-700 dark:bg-stone-800">
          <ul className="flex flex-col gap-1">
            {filteredPoints.map((point) => (
              <li key={point.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(point.id)}
                  className={
                    'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ' +
                    (selectedId === point.id ? 'bg-teal-500 text-white' : 'hover:bg-teal-50 dark:hover:bg-teal-900/30')
                  }
                >
                  {point.name}
                  <span className="ml-2 text-xs opacity-70">{point.organ}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedPoint && <PointDetailCard point={selectedPoint} defaultShowStudyNote />}
      </div>
    </div>
  )
}
