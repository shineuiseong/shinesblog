import React, { useState, useEffect } from 'react'
import Banner from 'components/Banner/Banner'
import Sidebar from 'components/Sidebar/Sidebar'
import './Blog.module.css'

const Blog = () => {
  return (
    <>
      <Sidebar />
      <Banner />
    </>
  )
}

export default Blog
