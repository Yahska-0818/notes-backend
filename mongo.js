const mongoose = require('mongoose')

const url = 'mongodb+srv://therealakshay0818:sHayak2605@cluster0.dbrhnfy.mongodb.net/TestNoteApp?retryWrites=true&w=majority&appName=Cluster0r0'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

let note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
})

note = new Note({
  content: 'HTML is hard',
  important: false,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})
