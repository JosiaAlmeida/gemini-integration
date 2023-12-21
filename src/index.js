require('dotenv/config')
const express = require('express')
const modulePath = `${__dirname}/worker/gemini.js`
const cp = require('child_process')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

async function main() {
  const worker = cp.fork(modulePath, [])

  worker.on("message", msg => console.log("Message caught on parent", msg))
  worker.on("error", msg => console.log('Error caught on parent', msg))
  worker.send("Ok")
}

app.listen(3001, () => {
  console.log("Rodando api com gemini")
  main()
})