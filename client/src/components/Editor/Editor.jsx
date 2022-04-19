import React, { useRef, useEffect, useCallback } from 'react'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import Quill from 'quill'
import MagicUrl from 'quill-magic-url'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import styles from './Editor.module.css'

/*
    QUill을 이용하여 구현한 게시글 컴포넌트.

 */

const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 1rem;
    min-height: 480px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 1rem;
  }
`

const Editor = ({ title, content, onChangeField, onChangeLanguage }) => {
  const quillElement = useRef('') // quill을 적용할 divelement
  const quillInstance = useRef('') // quill 인스턴스설정

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    quillInstance.current.root.innerHTML = content
  }, [content])

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value })
  }

  return (
    <section className={styles.editorWrapper}>
      <input className={styles.titleInput} type="text" placeholder="제목을 입력하세요" onChange={onChangeTitle} value={title} />
      <QuillWrapper>
        <div className={styles.quillEditor} ref={quillElement} />
      </QuillWrapper>
    </section>
  )
}

export default Editor
