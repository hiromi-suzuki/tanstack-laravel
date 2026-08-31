import type { Todo } from './types'

async function request<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return await response.json() as T
}

export function getTodos() {
  return request<Todo[]>('/api/todos')
}

export function createTodo(title: string) {
  return request<Todo>('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
}

export function updateTodo(id: number, changes: Partial<Pick<Todo, 'title' | 'completed'>>) {
  return request<Todo>(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
}

export async function deleteTodo(id: number) {
  const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
}
