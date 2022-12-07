import React from 'react'
import { Button, PageHeader, Modal, Form, Input } from 'antd'
import moment from 'moment'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import { useState, useEffect } from 'react'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { ArticleAddApi } from '../request/api'
import { useParams } from 'react-router-dom'

export default function Edit() {
  i18nChangeLanguage('en')
  const [editor, setEditor] = useState(null)
  const [html, setHtml] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const params = useParams()
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }
  // modal ok click
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let { title, subTitle } = values
        console.log(html)
        //send request
        ArticleAddApi({
          title,
          subTitle,
          content: html,
        }).then((res) => {
          console.log(res)
        })
      })
      .catch((info) => {
        return
      })
    setIsModalOpen(false)
  }

  // modal cancel click
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setHtml('<p>hello world</p>')
    // }, 1500)
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
        onBack={
          params.id
            ? () => {
                window.history.back()
              }
            : null
        }
        title="Editing Article"
        subTitle={moment(new Date()).format('YYYY-MM-DD')}
        extra={
          <Button type="primary" onClick={showModal}>
            Submit Article
          </Button>
        }
      >
        <Modal
          title="Adding Article Title"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 21,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Sub-Title" name="subTitle">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </PageHeader>
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
