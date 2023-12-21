const cp = require('child_process')

const modulePath = `../worker/gemini.js`

export const chatRepository = {
  sentMessage(text) {

    const worker = cp.fork(modulePath, [])

    worker.on("message", msg => console.log("Message caught on parent", msg))
    worker.on("error", msg => console.log('Error caught on parent', msg))
    worker.send("Ok")
  }
}