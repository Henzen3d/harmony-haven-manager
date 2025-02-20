
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Residents from './pages/Residents'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/residents" element={<Residents />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
