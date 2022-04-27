import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { modifyPost, writePost } from 'store/write'
import Writebutton from './WriteButton'
import { toast } from 'react-toastify'

const WriteButtonContainer = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { title, content, post, postError, postId } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    post: write.post,
    postError: write.postError,
    postId: write.postId,
  }))

  const checkValidity = () => {
    if (!title) {
      toast.error('제목을 입력해주세요!', {
        position: 'top-right',
        autoClose: 3000,
      })
      return false
    }

    if (!content) {
      toast.error('내용을 입력해주세요!', {
        position: 'top-right',
        autoClose: 3000,
      })
      return false
    }
    return true
  }

  // language 자동으로 넘어가도록 수정
  const onPublish = () => {
    if (!checkValidity()) return

    if (postId) {
      dispatch(modifyPost({ postId, title, content })).then((response) => {
        toast.info('글 수정이 완료되었어요!', {
          position: 'top-right',
          autoClose: 3000,
        })
      })
    } else {
      dispatch(writePost({ title, content })).then((response) => {
        toast.success('글 작성이 완료되었어요!', {
          position: 'top-right',
          autoClose: 3000,
        })
      })
    }
  }
  const onCancel = () => {
    history.goBack()
  }

  useEffect(() => {
    if (post) {
      history.push(`/`)
    }

    if (postError) {
      console.log(post.Error)
    }
  }, [history, post, postError])

  return <Writebutton onPublish={onPublish} onCancel={onCancel}></Writebutton>
}

export default WriteButtonContainer
