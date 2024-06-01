import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import ShopPay from './ShopPay'

const App = () => {
  return (
   <>
   
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/shop' element={<ShopPay/>} />


    </Routes>
   
   </>
  )
}

export default App