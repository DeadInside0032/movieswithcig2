import React from 'react'
import { Outlet } from 'react-router'
import { MyBottomNav } from './MyBottomNav'

export const MyLayout = () => {
  return (
    <>
      <Outlet/>{/*ide kerül minden oldal */}
      <MyBottomNav/>
    </>
  )
}


