import { useEffect, useState } from 'react'
import { createTodo, deleteTodo, getTodos, updateTodo } from './api'
import type { Todo } from './types'

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTodos = async () => {
    setLoading(true)
    try {
      setTodos(await getTodos())
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'エラーが発生しました。')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadTodos() }, [])

  const addTodo = async (event: React.FormEvent) => {
    event.preventDefault()
    const value = title.trim()
    if (!value) return
    try {
      await createTodo(value)
      setTitle('')
      await loadTodos()
    } catch {
      setError('TODOを追加できませんでした。')
    }
  }

  const toggleTodo = async (todo: Todo, completed: boolean) => {
    try {
      await updateTodo(todo.id, { completed })
      await loadTodos()
    } catch {
      setError('TODOを更新できませんでした。')
    }
  }

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id)
      await loadTodos()
    } catch {
      setError('TODOを削除できませんでした。')
    }
  }

  const visibleTodos = todos.filter((todo) =>
    filter === 'active' ? !todo.completed : filter === 'completed' ? todo.completed : true,
  )
  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <main className="page">
      <section className="todo-card">
        <header className="hero">
          <div><p className="eyebrow">TANSTACK START × LARAVEL</p><h1>TODO Garden</h1><p className="subtitle">小さな一歩を、毎日の習慣に。</p></div>
          <div className="leaf" aria-hidden="true">✦</div>
        </header>
        <form className="add-form" onSubmit={addTodo}>
          <input aria-label="新しいTODO" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="今日やることを追加..." maxLength={255} />
          <button type="submit">追加する</button>
        </form>
        {error && <p role="alert" className="error">{error}</p>}
        <div className="toolbar">
          <span>{remaining}件のTODO</span>
          <nav aria-label="TODOフィルター">{(['all', 'active', 'completed'] as const).map((value) => <button type="button" className={filter === value ? 'selected' : ''} key={value} onClick={() => setFilter(value)}>{value === 'all' ? 'すべて' : value === 'active' ? '未完了' : '完了済み'}</button>)}</nav>
        </div>
        {loading ? <p className="empty">読み込み中...</p> : visibleTodos.length === 0 ? <p className="empty">TODOはまだありません。</p> : <ul className="todo-list">{visibleTodos.map((todo) => <li key={todo.id}><label><input type="checkbox" checked={todo.completed} onChange={(event) => void toggleTodo(todo, event.target.checked)} /><span className={todo.completed ? 'done' : ''}>{todo.title}</span></label><button type="button" className="delete" aria-label={`${todo.title}を削除`} onClick={() => void removeTodo(todo.id)}>削除</button></li>)}</ul>}
        <footer><span>Laravel APIで安全に保存中</span><span>●</span></footer>
      </section>
    </main>
  )
}
