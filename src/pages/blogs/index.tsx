import PageHeader from '../../components/ui/pageHeader'
import { useNavigate } from 'react-router-dom'
import BlogsList from './components/blogsList'
import CustomModal from '../../components/common/modal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../store'
import { setSelectedBlog } from '../../store/slices/blogsSlices'
import { deleteBlogAction } from '../../store/slices/blogsSlices/actions'
import { toggleModal } from '../../store/slices/modalSlices'

const Blogs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedBlog } = useSelector((state: IRootStore) => state.blogs)
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/blogs/0')
  }

  const handleSubmitModal = () => {
    if (selectedBlog) {
      dispatch(deleteBlogAction(selectedBlog.id)).then(() => {
        dispatch(setSelectedBlog(null))
        dispatch(toggleModal(null))
      })
    }
  }

  const handleCancelModal = () => {
    dispatch(setSelectedBlog(null))
  }

  return (
    <>
      <PageHeader title='Blogs' btnText='Add' onBtnClick={handleNavigate} />
      <BlogsList />
      <CustomModal onCancel={handleCancelModal} onOk={handleSubmitModal}>
        <></>
      </CustomModal>
    </>
  )
}

export default Blogs
