import React from 'react'
import { Button, PageHeader } from 'antd'
import moment from 'moment'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import { useState, useEffect } from 'react'
import { i18nChangeLanguage } from '@wangeditor/editor'

export default function Edit() {
  i18nChangeLanguage('en')
  const [editor, setEditor] = useState(null)
  const [html, setHtml] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: 'Type here...',
  }

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => {
          window.history.back()
        }}
        title="Editing Article"
        subTitle={moment(new Date()).format('YYYY-MM-DD')}
        extra={<Button type="primary">Submit Article</Button>}
      ></PageHeader>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </div>
  )
}
