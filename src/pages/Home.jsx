import React from 'react'
import { CreatePost } from '../components/CreatePost'
import { ListPosts } from '../components/ListPosts'
import { loginStateAtom } from '../components/Atoms'
import { useAtomValue } from 'jotai';


export const Home = () => {
  const profile = useAtomValue(loginStateAtom);
  return (
    <>
      <div className='py-3'>
        <h1>Home</h1>
        <p>
        Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.
      </p>
      </div>
      {profile.isLogged ? (
        <div>
          <CreatePost/>
          <ListPosts/>
        </div>
      ) : (
        <p>Must be logged</p>
      )}
    </>
  )
}
