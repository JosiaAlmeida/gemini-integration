const modulePath = `../worker/gemini.js`
const path = require('path')
const cp = require('child_process')
const { message } = require("../worker/gemini")

const chatRepository = {
  async sentMessage(text) {

    const worker = cp.fork(modulePath, [])

    worker.on("message", msg => message(text))
    worker.on("error", msg => console.log('Error caught on parent', msg))
    worker.send("Ok")
  }
}

module.exports = { chatRepository }