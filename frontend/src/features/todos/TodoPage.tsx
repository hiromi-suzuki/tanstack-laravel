import { useEffect, useState, type FormEvent } from 'react'
import { createTodo, deleteTodo, getTodos, updateTodo } from './api'
import { TodoFilters, type TodoFilter } from './TodoFilters'
import { TodoFooter } from './TodoFooter'
import { TodoForm } from './TodoForm'
import { TodoHeader } from './TodoHeader'
import { TodoList } from './TodoList'
import type { Todo } from './types'

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')
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

  const addTodo = async (event: FormEvent) => {
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

  return (
    <main className="page">
      <section className="todo-card">
        <TodoHeader />
        <TodoForm title={title} onTitleChange={setTitle} onSubmit={addTodo} />
        {error && <p role="alert" className="error">{error}</p>}
        <TodoFilters
          filter={filter}
          remaining={todos.filter((todo) => !todo.completed).length}
          onFilterChange={setFilter}
        />
        <TodoList
          todos={visibleTodos}
          loading={loading}
          onToggle={toggleTodo}
          onDelete={removeTodo}
        />
        <TodoFooter />
      </section>
    </main>
  )
}
