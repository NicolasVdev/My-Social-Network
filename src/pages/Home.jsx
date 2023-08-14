import React from 'react'
import { CreatePost } from '../components/CreatePost'

export const Home = () => {
  return (
    <>
      <div className='py-3'>
        <h1>Home</h1>
      </div>
      <CreatePost/>
    </>
  )
}
