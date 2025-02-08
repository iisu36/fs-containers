import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('Todo component', () => {
  const mockTodo = {
    text: 'Test todo',
    done: false,
  }

  const mockHandleComplete = vi.fn()
  const mockHandleDelete = vi.fn()

  test('renders todo text', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockHandleComplete}
        onClickDelete={mockHandleDelete}
      />
    )
    expect(screen.getByText('Test todo')).toBeDefined()
  })

  test('shows not done status when todo is incomplete', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockHandleComplete}
        onClickDelete={mockHandleDelete}
      />
    )
    expect(screen.getByText('This todo is not done')).toBeDefined()
  })

  test('shows done status when todo is complete', () => {
    const doneTodo = { ...mockTodo, done: true }
    render(
      <Todo
        todo={doneTodo}
        onClickComplete={mockHandleComplete}
        onClickDelete={mockHandleDelete}
      />
    )
    expect(screen.getByText('This todo is done')).toBeDefined()
  })

  test('delete button is always visible', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockHandleComplete}
        onClickDelete={mockHandleDelete}
      />
    )
    expect(screen.getByText('Delete')).toBeDefined()
  })

  test('set as done button only shows when todo is not done', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockHandleComplete}
        onClickDelete={mockHandleDelete}
      />
    )
    expect(screen.getByText('Set as done')).toBeDefined()
  })
})
