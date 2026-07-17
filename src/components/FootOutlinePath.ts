// 足裏(甲側から見た反射区チャート用)のシルエットパス。viewBox: 0 0 220 520
export const SOLE_PATH =
  'M60,50 C40,60 25,85 20,120 C14,170 10,210 10,260 C10,310 14,360 25,400 ' +
  'C35,440 45,465 65,485 C90,508 120,516 150,512 C180,508 200,485 208,450 ' +
  'C214,420 214,380 210,340 C206,300 208,250 205,200 C202,155 195,110 178,80 ' +
  'C165,58 148,46 125,42 C105,39 80,40 60,50 Z'

export interface ToeSpec {
  cx: number
  cy: number
  rx: number
  ry: number
}

export const TOES: ToeSpec[] = [
  { cx: 45, cy: 20, rx: 26, ry: 23 },
  { cx: 96, cy: 11, rx: 14, ry: 17 },
  { cx: 126, cy: 7, rx: 13, ry: 16 },
  { cx: 154, cy: 11, rx: 12, ry: 15 },
  { cx: 178, cy: 19, rx: 11, ry: 14 },
]

export const FOOT_VIEWBOX_WIDTH = 220
export const FOOT_VIEWBOX_HEIGHT = 520
