import { footPoints } from '../data/points'
import type { FootPoint } from '../data/types'

export interface SearchResult {
  point: FootPoint
  score: number
}

export function searchPointsBySymptom(query: string): SearchResult[] {
  const q = query.trim()
  if (!q) return []

  const results: SearchResult[] = []
  for (const point of footPoints) {
    let score = 0
    for (const symptom of point.symptoms) {
      if (symptom === q) score += 5
      else if (symptom.includes(q) || q.includes(symptom)) score += 2
    }
    if (point.name.includes(q) || point.kana.includes(q)) score += 3
    if (point.organ.includes(q)) score += 1
    if (score > 0) results.push({ point, score })
  }

  return results.sort((a, b) => b.score - a.score)
}

export const quickSymptoms = [
  '肩こり',
  '首こり',
  '頭痛',
  '目の疲れ',
  '冷え性',
  'むくみ',
  '便秘',
  '胃もたれ',
  '腰痛',
  '不眠',
  'ストレス',
  '生理痛',
  '疲労',
  '花粉症',
  '膝が痛い',
  '脚のむくみ',
]
