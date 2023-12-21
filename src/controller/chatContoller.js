const { chatRepository } = require('./repository/chatRepository')

const controller = {
  async chat(req, res) {
    chatRepository.sentMessage(res.body.message)
    return req.status(200).json({ message: 'Enviado' })
  }
}