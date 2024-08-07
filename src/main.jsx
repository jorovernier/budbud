import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import Settings from './components/Settings.jsx'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
