import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const getNotes = () => {
    axios.get('http://localhost:5000/note')
      .then(res => {
        console.log('get response: ', res.data)
        setNotes(res.data)
      })
  }

  useEffect(() => {
    getNotes()
  }, [])

  const handleSubmit = () => {
    axios.post('http://localhost:5000/note', { title, content })
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setTitle('')
        setContent('')
      })
  }

  return (
    <div className='home-container'>
      <h1>Hello World!</h1>
      <h2>Notes:</h2>
      {notes.map(note => {
        return (
          <div>
            <h2>{note.title}</h2>
            <h3>{note.content}</h3>
          </div>
        )
      })}

      <h2>Enter Note</h2>
      <form>
        <input type='text' value={title} placeholder='title' onChange={e => setTitle(e.target.value)} />
        <input type='text' value={content} placeholder='content' onChange={e => setContent(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default App
