import React from 'react'
import CartContainer from './components/cartContainer'
import {userInfo} from '@/lib/userInfo'
  

const CartPage = async() => {
const {storeId, userId} = await userInfo()
  return (
      <CartContainer storeId={storeId} userId={userId}/>
  )
}

export default CartPage
