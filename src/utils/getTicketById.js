import redis from "../redisClient.js"

export async function getTicketById(ticketId) {
    try {
        const data = await redis.get(`ticket:${ticketId}`)
        if (!data) return null
        return JSON.parse(data)
    } catch (error) {
        console.error("Errore nel recupero ticket da Redis:", error)
        return null
    }
}
