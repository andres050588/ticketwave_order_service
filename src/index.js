import express from "express"
import "./events/subscriber.js"
import sequelize from "./config/db.js"
import { startRedisSubscribers } from "./events/subscriber.js"
import routerOrders from "./routes/orderRoutes.js"
import cron from "node-cron"
import checkExpiredOrders from "./cron/checkExpiredOrders.js"

const app = express()
app.use(express.json())

app.use("/api", routerOrders)

const PORT = process.env.PORT || 3003

cron.schedule("*/1 * * * *", async () => {
    console.log("[order_service] 🔁 Controllo ordini scaduti...")
    await checkExpiredOrders()
})

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log("✅ Connessione a MySQL riuscita")

        await sequelize.sync({}) // aggiungo { force: true } se voglio ressetare i dati nella db
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
