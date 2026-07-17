export type FootSide = 'left' | 'right' | 'both'

export interface FootPoint {
  /** 一意なID */
  id: string
  /** 反射区名(正式名) */
  name: string
  /** 読み仮名(検索補助) */
  kana: string
  /** 対応する臓器・体の部位 */
  organ: string
  /** 学習モードでのグルーピング */
  category: '頭部・感覚器' | '呼吸器・胸部' | '消化器' | '泌尿器' | '内分泌' | '骨格・筋肉' | '生殖器' | 'リンパ・神経'
  /** どちらの足にあるか */
  feet: FootSide
  /** 基準座標(右足基準、0-220 内側→外側、0-520 つま先→かかと) */
  x: number
  y: number
  /** ハイライト円の半径 */
  radius: number
  /** お客様に説明する用の、わかりやすい一言説明 */
  customerExplain: string
  /** お客様に伝える効果・効能タグ */
  effects: string[]
  /** 症状検索用キーワード */
  symptoms: string[]
  /** 押すと痛い場合に伝える一言(用途2向け) */
  painMeaning: string
  /** 学習モード向けの詳しい位置・押し方メモ */
  studyNote: string
}
