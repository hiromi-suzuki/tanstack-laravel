import type { FormEvent } from 'react'

type TodoFormProps = {
  title: string
  onTitleChange: (title: string) => void
  onSubmit: (event: FormEvent) => void
}

export function TodoForm({ title, onTitleChange, onSubmit }: TodoFormProps) {
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <input
        aria-label="新しいTODO"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="今日やることを追加..."
        maxLength={255}
      />
      <button type="submit">追加する</button>
    </form>
  )
}
