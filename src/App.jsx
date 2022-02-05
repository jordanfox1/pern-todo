import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [todo_item, setItem] = useState("")
  const [todos, setTodos] = useState([])



  // useEffect(() => {
  //   console.log(todo_item)
  // }, [todo_item]);

  useEffect( async function getTodos() {
    try {
      const response = await fetch("http://localhost:5000/todos")
      const data = await response.json()
      setTodos(data)
      console.timeLog(data)
      console.log(todos)
    } catch (error) {
      console.error(error.message)
    }
  }, [])
  
  async function onSubmit(e){
      e.preventDefault()
      try {
        const body = { todo_item }
        const response = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        })
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
  }

  return (
    <>
    <form action="todos" onSubmit={onSubmit}>
      <label>Create a todo</label>
      <input type="text" value={todo_item} onChange={e => setItem(e.target.value)} />
      <button>CREATE</button>
    </form>
    <ul>
      <h1>{todos.length} todos</h1>
      { todos.length > 0 && todos.map((todo) => 
        <li>{todo.todo_item}</li>
      )}
    </ul>
    </>
  )
}

export default App
