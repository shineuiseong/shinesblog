import React, { useCallback, useEffect } from 'react'
import Editor from './Editor'
import styles from './EditorContainer.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, clearField } from 'store/write'

const EditorContainer = (props) => {
  const dispatch = useDispatch()
  const { title, content } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
  }))
  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch])

  /* EditorContainer unmount시 quill editor 초기화 */
  useEffect(() => {
    return () => {
      dispatch(clearField())
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Editor onChangeField={onChangeField} title={title} content={content}></Editor>
    </div>
  )
}

export default EditorContainer
