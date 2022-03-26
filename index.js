const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (request, response) =>{
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response, next) => {
  response.json(notes)
  next()
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note) {
    response.json(note)
  }else{
    response.status(404).end()
  }
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  
  response.status(204).end()
})

app.post('/api/notes', (request, response) =>{
  const note = request.body

  if(!note || !note.content){
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = {
    id: Math.random(),
    content: note.content,
    date: new Date().toISOString(),
    import: note.important || false
  }

  notes = notes.concat(newNote)
  response.status(201).json(newNote)
})

app.use((request, response) =>{
  response.status(404).json({
    error: 'Not Found'
  })
})



const PORT = 3002
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})