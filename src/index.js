import express from "express"
import redis from "./redisClient.js"

const app = express()
app.use(express.json())

const subscriber = redis.duplicate()

await subscriber.connect()

await subscriber.subscribe("ticket-creato", message => {
    const ticket = JSON.parse(message)
    console.log("🎟️ Ticket ricevuto:", ticket)
})

// Avvia server Express
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(` Order Service attivo sulla porta ${PORT}`)
})
