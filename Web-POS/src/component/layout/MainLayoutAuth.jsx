import React from 'react'
import { Outlet } from 'react-router-dom'
const MainLayoutAuth = () => {
  return (
    <div>
        <div>
            <h1>POS-Auth</h1>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayoutAuth