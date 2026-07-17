import { useMemo, useState } from 'react'
import { FootDiagram } from '../components/FootDiagram'
import { PointDetailCard } from '../components/PointDetailCard'
import { footPoints } from '../data/points'
import { quickSymptoms, searchPointsBySymptom } from '../lib/search'

export function AssistPage() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const results = useMemo(() => searchPointsBySymptom(query), [query])
  const highlightIds = useMemo(() => new Set(results.map((r) => r.point.id)), [results])
  const selectedPoint = selectedId ? footPoints.find((p) => p.id === selectedId) : undefined

  function handleSelect(id: string) {
    setSelectedId(id)
  }

  function handleQuickSymptom(symptom: string) {
    setQuery(symptom)
    setSelectedId(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800 sm:p-6">
        <p className="mb-4 text-sm text-stone-500 dark:text-stone-400">
          お客様の症状を入力するか、下の足裏図のツボを直接タップしてください。
        </p>
        <FootDiagram selectedId={selectedId} highlightIds={highlightIds} onSelect={handleSelect} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
          <label htmlFor="symptom" className="text-sm font-medium text-stone-600 dark:text-stone-300">
            症状を入力
          </label>
          <input
            id="symptom"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedId(null)
            }}
            placeholder="例: 肩こり、むくみ、便秘..."
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-800 focus:border-teal-500 focus:outline-none dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {quickSymptoms.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleQuickSymptom(s)}
                className={
                  'rounded-full border px-3 py-1 text-xs transition-colors ' +
                  (query === s
                    ? 'border-teal-500 bg-teal-500 text-white'
                    : 'border-stone-300 text-stone-600 hover:border-teal-400 hover:text-teal-700 dark:border-stone-600 dark:text-stone-300')
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {query && (
          <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
            <p className="mb-2 text-sm font-medium text-stone-600 dark:text-stone-300">
              関連するツボ {results.length > 0 ? `(${results.length}件)` : ''}
            </p>
            {results.length === 0 ? (
              <p className="text-sm text-stone-400">該当するツボが見つかりませんでした。別のキーワードをお試しください。</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {results.map(({ point }) => (
                  <li key={point.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(point.id)}
                      className={
                        'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ' +
                        (selectedId === point.id
                          ? 'bg-teal-500 text-white'
                          : 'hover:bg-teal-50 dark:hover:bg-teal-900/30')
                      }
                    >
                      {point.name}
                      <span className="ml-2 text-xs opacity-70">{point.organ}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {selectedPoint && <PointDetailCard point={selectedPoint} />}
      </div>
    </div>
  )
}
