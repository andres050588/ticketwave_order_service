import express from "express"
import "./events/subscriber.js"
import sequelize from "./config/db.js"
import { startRedisSubscribers } from "./events/subscriber.js"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3003

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log("✅ Connessione a MySQL riuscita")

        await sequelize.sync({ force: true })
        console.log("🧩 Modelli sincronizzati con il database")

        await startRedisSubscribers()
        app.listen(PORT, () => {
            console.log(`🎧 Order Service attivo sulla porta ${PORT}`)
        })
    } catch (err) {
        console.error("❌ Errore nella connessione al DB:", err)
    }
}

startServer()
