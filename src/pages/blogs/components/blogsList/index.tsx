import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../store'
import { fetchBlogsAction } from '../../../../store/slices/blogsSlices/actions'
import { Button, Image } from 'antd'
import CustomCard from '../../../../components/common/card'
import { useNavigate } from 'react-router-dom'
import { setSelectedBlog } from '../../../../store/slices/blogsSlices'
import { IBlog } from '../../../../types/blogs'
import { toggleModal } from '../../../../store/slices/modalSlices'
import './blogsList.sass'

const BlogsList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs } = useSelector((state: IRootStore) => state.blogs)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchBlogsAction())
  }, [])

  const navigateToEditPage = (blog: IBlog) => {
    dispatch(setSelectedBlog(blog))
    navigate('/blogs/' + blog.id)
  }

  const handleDelete = (blog: IBlog) => {
    dispatch(setSelectedBlog(blog))
    dispatch(toggleModal({ type: 'del' }))
  }

  return (
    <div className='blogsList'>
      {blogs.map(blog => (
        <CustomCard key={blog.id} className='blogItem'>
          <div className='blogItem__info'>
            <div className='blogItem__info-img'>
              <Image
                src={`${import.meta.env.VITE_DOMAIN}/images/${blog.image}`}
                alt={blog.title}
                height={'100%'}
                width={'100%'}
              />
            </div>
            <h4>{blog.title}</h4>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                blog.content.length > 700
                  ? blog.content.slice(0, 700) + '...'
                  : blog.content
            }}
          />
          <Button
            className='blogItem__edit'
            onClick={() => navigateToEditPage(blog)}
          >
            Edit
          </Button>
          <Button
            className='blogItem__delete'
            onClick={() => handleDelete(blog)}
          >
            Delete
          </Button>
        </CustomCard>
      ))}
    </div>
  )
}

export default BlogsList
