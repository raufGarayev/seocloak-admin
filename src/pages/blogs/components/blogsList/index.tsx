import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../store'
import { fetchBlogsAction } from '../../../../store/slices/blogsSlices/actions'
import './blogsList.sass'
import { Image } from 'antd'
import CustomCard from '../../../../components/common/card'

const BlogsList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs } = useSelector((state: IRootStore) => state.blogs)

  useEffect(() => {
    dispatch(fetchBlogsAction())
  }, [])

  return (
    <div className='blogsList'>
      {blogs.map(blog => (
        <CustomCard>
          <div key={blog.id} className='blogItem'>
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
            <p dangerouslySetInnerHTML={{__html: blog.content}} />
          </div>
        </CustomCard>
      ))}
    </div>
  )
}

export default BlogsList
