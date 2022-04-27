import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import styles from './Editor.module.css'
import postService from 'service/post_service'
import Quill from 'quill'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'

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

const Editor = ({ title, content, language, onChangeField, onChangeLanguage }) => {
  const quillElement = useRef('') // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef('') // Quill 인스턴스를 설정
  const user = useSelector((state) => state.user)

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value })
  }
  /* default quill editor 설정 */
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: [
          //[{ 'font': [] }],
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],

          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ['clean'],
        ],
      },
      placeholder: '게시글 작성',
      readOnly: false,
      theme: 'snow',
    })

    const quill = quillInstance.current
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'content', value: quill.root.innerHTML })
      }
    })
  }, [onChangeField])

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    quillInstance.current.root.innerHTML = content
  }, [content])

  return (
    <section className={styles.editorWrapper}>
      <input className={styles.titleInput} type="text" placeholder="제목을 입력하세요" onChange={onChangeTitle} value={title} />
      <div className={styles.languageWrapper}>
        <h3 className={styles.languageList}>주제 : </h3>
        <input type="text" placeholder="주제" />
        <div className={styles.likeLanguagesWrapper}></div>
      </div>
      <QuillWrapper>
        <div className={styles.quillEditor} ref={quillElement} />
      </QuillWrapper>
    </section>
  )
}

export default Editor
