import React from 'react'

import styles from './PostRegister.module.css'
import Sidebar from 'components/Sidebar/Sidebar'
import EditorContainer from 'components/Editor/EditorContainer'
import WriteButtonContainer from 'components/Write_Button/WriteButtonContainer'
const PostRegister = () => {
  return (
    <>
      <Sidebar />
      <section className={styles.editorWrapper}>
        <EditorContainer></EditorContainer>
        <WriteButtonContainer></WriteButtonContainer>
      </section>
    </>
  )
}

export default PostRegister
