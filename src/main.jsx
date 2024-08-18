import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import Settings from './components/Settings.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} 
      loader={async () => {
        const accounts = await axios.get('/accounts')
        const cards = await axios.get('/cards')
        const expenses = await axios.get('/expenses')
        const income = await axios.get('/income')
        return {accounts: accounts.data, cards: cards.data, expenses: expenses.data, income: income.data}
      }} 
      />
      <Route path="/profile" element={<Profile />} loader={async () => {
        
      }} />
      <Route path="/settings" element={<Settings />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
