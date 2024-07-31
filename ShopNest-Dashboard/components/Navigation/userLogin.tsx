'use client'
import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'

const UserLogin = () => {
  return (
    <div>
        <button onClick={()=>signIn('google')}>sign in </button>
    </div>
  )
}

export default UserLogin


