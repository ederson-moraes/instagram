import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed'
import New from './pages/New'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/new" element={<New />} />
        </Routes>
    )
}

export default AppRoutes