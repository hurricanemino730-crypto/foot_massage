import { useMemo } from 'react'
import { footPoints } from '../data/points'
import type { FootSide } from '../data/types'
import { FOOT_VIEWBOX_HEIGHT, FOOT_VIEWBOX_WIDTH, SOLE_PATH, TOES } from './FootOutlinePath'

// 施術者がお客様の足裏と向き合う体勢を基準にした目安線(反射区チャートの慣例に合わせる)
const GUIDE_LINES = [
  { y: 100, label: '肩のライン' },
  { y: 178, label: '横隔膜ライン' },
  { y: 440, label: 'ヒップライン' },
]

interface SingleFootProps {
  side: 'left' | 'right'
  /** true の場合、内側(親指側)が画面の右寄りに来るよう左右反転して描画する */
  mirror: boolean
  selectedId?: string | null
  highlightIds?: Set<string>
  hasHighlights?: boolean
  onSelect: (id: string) => void
}

function matchesSide(feet: FootSide, side: 'left' | 'right') {
  return feet === 'both' || feet === side
}

function SingleFoot({ side, mirror, selectedId, highlightIds, hasHighlights, onSelect }: SingleFootProps) {
  const points = useMemo(() => footPoints.filter((p) => matchesSide(p.feet, side)), [side])

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox={`0 0 ${FOOT_VIEWBOX_WIDTH} ${FOOT_VIEWBOX_HEIGHT}`}
        className="h-auto w-full max-w-[220px] drop-shadow-sm"
        role="img"
        aria-label={side === 'left' ? '左足の反射区チャート' : '右足の反射区チャート'}
      >
        <g transform={mirror ? `scale(-1,1) translate(${-FOOT_VIEWBOX_WIDTH},0)` : undefined}>
          <path d={SOLE_PATH} className="fill-orange-50 stroke-orange-300 dark:fill-stone-700 dark:stroke-stone-500" strokeWidth={2} />
          {TOES.map((t, i) => (
            <ellipse
              key={i}
              cx={t.cx}
              cy={t.cy}
              rx={t.rx}
              ry={t.ry}
              className="fill-orange-50 stroke-orange-300 dark:fill-stone-700 dark:stroke-stone-500"
              strokeWidth={2}
            />
          ))}
          {GUIDE_LINES.map((g) => (
            <line
              key={g.label}
              x1={8}
              y1={g.y}
              x2={FOOT_VIEWBOX_WIDTH - 8}
              y2={g.y}
              className="stroke-orange-300/70 dark:stroke-stone-400/50"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}
          {points.map((p) => {
            const isSelected = selectedId === p.id
            const isHighlighted = highlightIds?.has(p.id) ?? false
            const isDimmed = hasHighlights && !isHighlighted && !isSelected
            return (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={isSelected ? p.radius + 3 : p.radius}
                onClick={() => onSelect(p.id)}
                className={
                  'cursor-pointer transition-all ' +
                  (isSelected
                    ? 'fill-teal-500/80 stroke-teal-700 dark:stroke-teal-200'
                    : isHighlighted
                      ? 'fill-amber-400/80 stroke-amber-600 animate-pulse dark:stroke-amber-200'
                      : isDimmed
                        ? 'fill-stone-300/40 stroke-stone-300/60 dark:fill-stone-500/20 dark:stroke-stone-500/30'
                        : 'fill-teal-400/40 stroke-teal-500/70 hover:fill-teal-400/70 dark:fill-teal-300/30 dark:stroke-teal-300/60')
                }
                strokeWidth={isSelected ? 3 : 2}
              >
                <title>{p.name}</title>
              </circle>
            )
          })}
        </g>
      </svg>
      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
        {side === 'left' ? '左足' : '右足'}
      </span>
    </div>
  )
}

interface FootDiagramProps {
  selectedId?: string | null
  highlightIds?: Set<string>
  onSelect: (id: string) => void
}

// 施術者がお客様と向き合って足裏を見る一般的なチャートの並びに合わせ、
// お客様の右足を画面左側、左足を画面右側に配置する。
export function FootDiagram({ selectedId, highlightIds, onSelect }: FootDiagramProps) {
  const hasHighlights = !!highlightIds && highlightIds.size > 0
  return (
    <div className="flex items-start justify-center gap-4 sm:gap-8">
      <SingleFoot side="right" mirror selectedId={selectedId} highlightIds={highlightIds} hasHighlights={hasHighlights} onSelect={onSelect} />
      <SingleFoot side="left" mirror={false} selectedId={selectedId} highlightIds={highlightIds} hasHighlights={hasHighlights} onSelect={onSelect} />
    </div>
  )
}
