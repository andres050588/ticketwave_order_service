import redis from "../redisClient.js"
import handleTicketCancellato from "../handlers/deletedTicket.js"

const subscriber = redis.duplicate()

// Ascolta il canale 'ticket-cancellato'
await subscriber.subscribe("ticket-cancellato", message => {
    console.log("Messaggio ricevuto da ticket-cancellato:", message)
    handleTicketCancellato(message)
})
