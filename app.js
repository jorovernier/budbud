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
app.get('/accounts', async (req, res) => {
    const accounts = await Account.findAll({where: {user_user_id: 1}})
    res.json(accounts)
})
app.get('/cards', async (req, res) => {
    
})
app.get('/expenses', async (req, res) => {
    
})
app.get('/income', async (req, res) => {
    
})

ViteExpress.listen(app, port, () => console.log(`Tracking spending on http://localhost:${port}`))