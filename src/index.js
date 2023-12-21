require('dotenv/config')
const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(3001, () => {
  console.log("Rodando api com gemini")
})