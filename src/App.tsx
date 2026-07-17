import { useState } from 'react'
import { AssistPage } from './pages/AssistPage'
import { StudyPage } from './pages/StudyPage'

type Tab = 'assist' | 'study'

function App() {
  const [tab, setTab] = useState<Tab>('assist')

  return (
    <div className="min-h-svh bg-stone-50 pb-10 dark:bg-stone-900">
      <header className="border-b border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-teal-800 dark:text-teal-200 sm:text-2xl">足つぼナビ</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">足裏反射区ガイド — 症状からツボを探す・ツボの意味を調べる</p>
          <nav className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setTab('assist')}
              className={
                'rounded-full px-4 py-2 text-sm font-medium transition-colors ' +
                (tab === 'assist'
                  ? 'bg-teal-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300')
              }
            >
              施術サポート
            </button>
            <button
              type="button"
              onClick={() => setTab('study')}
              className={
                'rounded-full px-4 py-2 text-sm font-medium transition-colors ' +
                (tab === 'study'
                  ? 'bg-teal-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300')
              }
            >
              ツボ一覧・学習
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {tab === 'assist' ? <AssistPage /> : <StudyPage />}
      </main>
    </div>
  )
}

export default App
