import React from 'react'
import PageHeader from '../../components/ui/pageHeader'
import { useNavigate } from 'react-router-dom'
import BlogsList from './components/blogsList'

const Blogs = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/blogs/0')
  }

  return (
    <>
      <PageHeader title='Blogs' btnText='Add' onBtnClick={handleNavigate} />
      <BlogsList />
    </>
  )
}

export default Blogs
