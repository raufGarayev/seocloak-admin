import React from 'react'
import CustomCard from '../../../../components/common/card'
import { Button, Form, Input, Skeleton, Upload } from 'antd'
import JoditEditor from 'jodit-react'

const BlogForm = () => {
  return (
    <CustomCard>
      {/* <Skeleton active={false}> */}
      <Form layout="vertical">
        <div className='flexedFormItems'>
          <Form.Item label='Blog title' name={'title'}>
            <Input />
          </Form.Item>
          <Form.Item label="Blog image" name={'image'}>
            <Upload>
              <Button>Click to upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item label='Content' name={'content'}>
          <JoditEditor value='' />
        </Form.Item>
        <div className='contentBtns'>
          <Button className='cancelBtn'>Cancel</Button>
          <Form.Item>
            <Button className='saveBtn' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
      {/* </Skeleton> */}
    </CustomCard>
  )
}

export default BlogForm
