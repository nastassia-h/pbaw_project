import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const DefaultLayout = () => {

   const token = useSelector(state => state.token)

   if (!token) {
      return <Navigate to="/login" />
   }

   return (
      <div>
         <div>Default</div>
         <Outlet />
      </div>
   )
}

export default DefaultLayout