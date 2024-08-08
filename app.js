import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import {} from 'dotenv/config'
import {User, Expense, ExType, Income, InType, Card, Account, db} from './src/model.js'

const app = express()
const port = '8000'
ViteExpress.config({ printViteDevServerHost: true })

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: process.env.SECRET, saveUninitialized: true, resave: false }))

// Endpoints
app.get('/accounts/:id', async (req, res) => {
    const accounts = await Account.findAll({where: {user_id: req.params.id}})
    res.json(accounts)
})
app.get('/cards/:id', async (req, res) => {
    const cards = await Card.findAll({where: {user_id: req.params.id}})
    res.json(cards)
})
app.get('/expenses/:id', async (req, res) => {
    const expenses = await Expense.findAll({include: ExType, where: {user_id: req.params.id}})
    res.json(expenses)
})
app.get('/income/:id', async (req, res) => {
    const income = await Income.findAll({include: InType, where: {user_id: req.params.id}})
    res.json(income)
})

ViteExpress.listen(app, port, () => console.log(`Tracking spending on http://localhost:${port}`))