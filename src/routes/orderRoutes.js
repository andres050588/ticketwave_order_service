import express from "express"
import { createOrder, completeOrder, getUserOrders, cancelOrder } from "../controllers/orderController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const routerOrders = express.Router()

// POST api/orders - crea un ordine autenticato
routerOrders.post("/orders", express.json(), verifyToken, createOrder)

//POST finalizza i'ordine
routerOrders.post("/orders/:id/complete", verifyToken, completeOrder)

//GET mostra ordini utente
routerOrders.get("/orders", verifyToken, getUserOrders)

//DELETE - annullamento dell'ordine e update del status biglietto a 'disponibile'
routerOrders.delete("/orders/:id", verifyToken, cancelOrder)

export default routerOrders
