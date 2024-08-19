import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import {} from 'dotenv/config'
import { User, Expense, ExType, Income, InType, Card, Account, db } from './src/model.js'

const placeholder = 1

const app = express()
const port = '8000'
ViteExpress.config({ printViteDevServerHost: true })

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: process.env.SECRET, saveUninitialized: true, resave: false }))

// Endpoints
app.get('/income', async (req, res) => {
    const income = await Income.findAll({include: InType, where: {user_id: placeholder}, order: [['inDate', 'DESC']]})
    res.json(income)
})
app.get('/expenses', async (req, res) => {
    const expenses = await Expense.findAll({include: ExType, where: {user_id: placeholder}, order: [['exDate', 'DESC']]})
    res.json(expenses)
})
app.get('/accounts', async (req, res) => {
    const accounts = await Account.findAll({where: {user_id: placeholder}})
    res.json(accounts)
})
app.get('/cards', async (req, res) => {
    const cards = await Card.findAll({where: {user_id: placeholder}})
    res.json(cards)
})

app.post('/income', async (req, res) => {
    let {amount, date, type} = req.body
    const income = await Income.create({
        inDate: date,
        inAmount: amount
    })
    
    const incomeType = await InType.findOne({where: {inTypeName: type}})
    incomeType.addIncome(income)
    
    const user = await User.findByPk(placeholder)
    user.addIncome(income)

    res.sendStatus(200)
})
app.post('/expense', async (req, res) => {
    let {amount, date, type, card, name} = req.body
    const expense = await Expense.create({
        exName: name,
        exDate: date,
        exAmount: amount
    })

    const expenseType = await ExType.findOne({where: {exTypeName: type}})
    expenseType.addExpense(expense)

    const cardUsed = await Card.findOne({where: {cardId: card}})
    cardUsed.addExpense(expense)

    const user = await User.findByPk(placeholder)
    user.addExpense(expense)

    res.sendStatus(200)
})
app.post('/account', async (req, res) => {
    let {bank, name, amount} = req.body

    const account = await Account.create({
        acctBank: bank,
        acctName: name,
        acctAmount: amount
    })
    
    const user = await User.findByPk(placeholder)
    user.addAccount(account)

    res.sendStatus(200)
})
app.post('/card', async (req, res) => {
    let {bank, name, limit, image} = req.body

    const card = await Card.create({
        cardBank: bank,
        cardName: name,
        creditLimit: limit,
        cardImage: image
    })

    const user = await User.findByPk(placeholder)
    user.addCard(card)

    res.sendStatus(200)
})

app.delete('/income/:id', async (req, res) => {
    const toDelete = await Income.findOne({where: {inId: req.params.id}})
    await toDelete.destroy()

    res.sendStatus(200)
})
app.delete('/expense/:id', async (req, res) => {
    const toDelete = await Expense.findOne({where: {exId: req.params.id}})
    await toDelete.destroy()

    res.sendStatus(200)
})
app.delete('/account/:id', async (req, res) => {
    const toDelete = await Account.findOne({where: {acctId: req.params.id}})
    await toDelete.destroy()

    res.sendStatus(200)
})
app.delete('/card/:id', async (req, res) => {
    const toDelete = await Card.findOne({where: {cardId: req.params.id}})
    await toDelete.destroy()

    res.sendStatus(200)
})

ViteExpress.listen(app, port, () => console.log(`Tracking spending on http://localhost:${port}`))