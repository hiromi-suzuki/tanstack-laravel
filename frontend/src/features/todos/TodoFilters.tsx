export type TodoFilter = 'all' | 'active' | 'completed'

type TodoFiltersProps = {
  filter: TodoFilter
  remaining: number
  onFilterChange: (filter: TodoFilter) => void
}

export function TodoFilters({ filter, remaining, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="toolbar">
      <span>{remaining}件のTODO</span>
      <nav aria-label="TODOフィルター">
        {(['all', 'active', 'completed'] as const).map((value) => (
          <button
            type="button"
            className={filter === value ? 'selected' : ''}
            key={value}
            onClick={() => onFilterChange(value)}
          >
            {value === 'all' ? 'すべて' : value === 'active' ? '未完了' : '完了済み'}
          </button>
        ))}
      </nav>
    </div>
  )
}
