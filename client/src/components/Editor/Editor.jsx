import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import styles from './Editor.module.css'
import postService from 'service/post_service'

import Quill from 'quill'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import MagicUrl from 'quill-magic-url'

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

  return <div>Editor</div>
}

export default Editor
