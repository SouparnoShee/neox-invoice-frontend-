import React from 'react'
import InvioceForm from './InvioceForm'
import InvoiceOutput from './InvoiceOutput'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <div className='neox-home'>
      <InvioceForm />
      <Toaster />
    </div>
  )
}

export default App
