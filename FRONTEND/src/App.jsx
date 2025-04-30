import React from 'react'
import AppRoutes from './utils/AppRoutes.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter(AppRoutes)
  return <>
  <RouterProvider router={router}/>
  </>
}

export default App