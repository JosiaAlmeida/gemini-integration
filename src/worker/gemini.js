const { Cluster } = require("puppeteer-cluster")
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function executeMessage({ data }) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(data.data)
  const response = await result.response
  const messageData = response.text()
  console.log("Ok ", messageData);
}

async function message() {
  console.log("Iniciando task...");
  const perguntas = [
    "Qual é o seu filme favorito e por quê?",
    "Se pudesse viajar para qualquer lugar do mundo, para onde iria e por quê?",
    "Se você tivesse superpoderes, qual gostaria de ter e como os usaria?",
    "O que te inspira e motiva na vida?",
    "Se pudesse jantar com qualquer pessoa, viva ou morta, quem escolheria e por quê?"
  ];
  try {
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 10
    })
    for (let pergunta of perguntas) {
      await cluster.task(executeMessage)
      await cluster.queue({ data: pergunta })
    }

    await cluster.idle()
    await cluster.close()
    console.log("Fechando task...");
  } catch (error) {
    console.log('Ocorreu uma falha com a mensagem: ', error)
  }
}

message()