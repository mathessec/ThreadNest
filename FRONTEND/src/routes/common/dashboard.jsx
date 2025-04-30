import React from 'react'
import TopBar from '../../components/common/TopBar.jsx'
function dashboard() {
  return (
    <div>
      <TopBar/>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold'>Welcome to the Dashboard</h1>
        <p className='mt-4 text-lg'>This is your dashboard where you can manage your account.</p>
      </div>
    </div>
  )
}

export default dashboard;