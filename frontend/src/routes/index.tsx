import { createFileRoute } from '@tanstack/react-router'
import { TodoPage } from '../features/todos/TodoPage'

export const Route = createFileRoute('/')({ component: TodoPage })
