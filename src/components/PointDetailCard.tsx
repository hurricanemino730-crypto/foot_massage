import type { FootPoint } from '../data/types'

const sideLabel: Record<FootPoint['feet'], string> = {
  both: '両足',
  left: '左足のみ',
  right: '右足のみ',
}

interface PointDetailCardProps {
  point: FootPoint
  defaultShowStudyNote?: boolean
}

export function PointDetailCard({ point, defaultShowStudyNote = false }: PointDetailCardProps) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100">{point.name}</h3>
          <p className="text-sm text-stone-400">{point.kana}</p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">
          {sideLabel[point.feet]}
        </span>
      </div>

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-stone-400">対応する体の部位</p>
      <p className="text-stone-700 dark:text-stone-200">{point.organ}</p>

      <div className="mt-4 rounded-xl bg-teal-50/70 p-4 dark:bg-teal-950/40">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-300">お客様への説明</p>
        <p className="mt-1 leading-relaxed text-stone-800 dark:text-stone-100">{point.customerExplain}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {point.effects.map((effect) => (
          <span
            key={effect}
            className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
          >
            {effect}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
        <span className="font-medium text-stone-500 dark:text-stone-400">押して痛い場合: </span>
        {point.painMeaning}
      </p>

      <details className="mt-4 rounded-xl border border-stone-200 p-3 dark:border-stone-600" open={defaultShowStudyNote}>
        <summary className="cursor-pointer text-sm font-medium text-teal-700 dark:text-teal-300">
          学習メモ：正確な位置と押し方
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{point.studyNote}</p>
      </details>
    </div>
  )
}
