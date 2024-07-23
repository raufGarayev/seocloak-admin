import React from 'react'
import PageHeader from '../../components/ui/pageHeader'
import BlogForm from './components/blogForm'
import BlogsList from '../blogs/components/blogsList'

const EditBlog = () => {
  return (
    <>
      <PageHeader title='Edit Blog' />
      <BlogForm />
    </>
  )
}

export default EditBlog
