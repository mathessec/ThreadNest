import express from 'express'
const app = express();

// to use express json to convert the incoming data to json using the parser

app.use(express.json())

app.listen(8000, () => console.log('Server started'))