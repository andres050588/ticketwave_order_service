import express from "express"
import "./events/subscriber.js"

const app = express()
app.use(express.json())

// Avvia server Express
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(` Order Service attivo sulla porta ${PORT}`)
})
