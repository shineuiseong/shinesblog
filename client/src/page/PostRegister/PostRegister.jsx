import React from 'react'
import Sidebar from 'components/Sidebar/Sidebar'
import styles from './PostRegister.module.css'

import EditorContainer from 'components/Editor/EditorContainer'

const PostRegister = () => {
  return (
    <>
      <Sidebar />
      <section className={styles.editorWrapper}>
        <EditorContainer></EditorContainer>
      </section>
    </>
  )
}

export default PostRegister
