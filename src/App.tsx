import { useState } from '@lynx-js/react'
import './App.css'
import { Input } from './components/ui/input.jsx'
import { Dialog } from './components/ui/dialog.jsx'

interface Todo {
  label: string
  done: boolean
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const toggleTodo = (index: number) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const addTodo = () => {
    const trimmed = newTodo.trim()
    if (!trimmed) return
    setTodos((prev) => [...prev, { label: trimmed, done: false }])
    setNewTodo('')
  }

  const openDeleteDialog = (index: number) => {
    setSelectedIndex(index)
    setDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedIndex !== null) {
      setTodos((prev) => prev.filter((_, i) => i !== selectedIndex))
    }
    setDialogOpen(false)
    setSelectedIndex(null)
  }

  const cancelDelete = () => {
    setDialogOpen(false)
    setSelectedIndex(null)
  }

  return (
    <view className="h-screen w-full flex flex-col justify-center items-center relative px-4 py-6">
      <text className="text-black text-center text-2xl font-bold">
        TODO APP WITH LYNX
      </text>

      <view className="w-full max-w-72 mt-6 flex justify-center items-center gap-2">
        <Input
          placeholder="Tulis todo..."
          type="text"
          value={newTodo}
          bindinput={(e: any) => setNewTodo(e.detail.value)}
        />
        <view
          bindtap={addTodo}
          className={`min-h-9 min-w-9 ${newTodo.trim() ? 'bg-green-500' : 'bg-green-200'
            } flex justify-center items-center rounded-md`}
        >
          <text className="text-2xl text-white font-bold">+</text>
        </view>
      </view>

      <view className="w-full max-w-72 mt-6 flex flex-col gap-2">
        <view className='flex items-center justify-between'>
          <text className="font-semibold">Daftar: </text>
          <text>{todos.filter(t => t.done === true).length}/{todos.length} selesai</text>
        </view>

        <view className="w-full bg-sky-50 rounded-lg overflow-hidden shadow-inner border border-sky-100">
          <scroll-view className="h-64 px-4 py-2" scroll-y>
            {todos.length === 0 ? (
              <view className="h-full flex items-center justify-center">
                <text className="text-gray-400">Belum ada 😴</text>
              </view>
            ) : (
              <view className="flex flex-col gap-3">
                {todos.map((todo, index) => (
                  <view
                    key={index}
                    bindtap={() => toggleTodo(index)}
                    bindlongpress={() => openDeleteDialog(index)}
                    className="w-full flex justify-between items-center border-b pb-1 border-gray-300"
                  >
                    <text className={`text-base ${todo.done ? 'text-green-500 line-through' : 'text-black'}`}>
                      {todo.label}
                    </text>
                    <text className={`text-xl ${todo.done ? 'text-green-500' : 'text-gray-400'}`}>
                      ✓
                    </text>
                  </view>
                ))}
              </view>
            )}
          </scroll-view>
        </view>
      </view>

      {dialogOpen && (
        <Dialog onCancel={cancelDelete} onConfirm={confirmDelete} />
      )}
    </view>
  )
}
