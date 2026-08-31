import type { Todo } from './types'

type TodoListProps = {
  todos: Todo[]
  loading: boolean
  onToggle: (todo: Todo, completed: boolean) => void
  onDelete: (id: number) => void
}

export function TodoList({ todos, loading, onToggle, onDelete }: TodoListProps) {
  if (loading) return <p className="empty">読み込み中...</p>
  if (todos.length === 0) return <p className="empty">TODOはまだありません。</p>

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) => onToggle(todo, event.target.checked)}
            />
            <span className={todo.completed ? 'done' : ''}>{todo.title}</span>
          </label>
          <button
            type="button"
            className="delete"
            aria-label={`${todo.title}を削除`}
            onClick={() => onDelete(todo.id)}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  )
}
