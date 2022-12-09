import React from 'react'
import { Button, PageHeader, Modal, Form, Input, message } from 'antd'
import moment from 'moment'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import { useState, useEffect } from 'react'
import { i18nChangeLanguage } from '@wangeditor/editor'
import {
  ArticleAddApi,
  ArticleSearchApi,
  ArticleUpdateApi,
} from '../request/api'
import { useParams, useNavigate } from 'react-router-dom'

export default function Edit() {
  i18nChangeLanguage('en')
  const [editor, setEditor] = useState(null)
  const [html, setHtml] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const params = useParams()

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const showModal = () => {
    setIsModalOpen(true)
  }
  // modal ok click
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let { title, subTitle } = values
        //地址栏有无id，显示添加或更新
        if (params.id) {
          ArticleUpdateApi({
            title,
            subTitle,
            content: html,
            id: params.id,
          }).then((res) => {
            if (res.errCode === 1) {
              message.error(res.message)
            } else {
              message.success(res.message)
              navigate('/lists')
            }
            setIsModalOpen(false)
          })
        } else {
          //send request 添加文章
          ArticleAddApi({
            title,
            subTitle,
            content: html,
          }).then((res) => {
            message.success(res.message)
            setIsModalOpen(false)
            navigate('/lists')
          })
        }
      })
      .catch((info) => {
        return
      })
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

  //根据地址栏id做请求
  if (params.id) {
    ArticleSearchApi({ id: params.id }).then((res) => {
      if (res.errCode === 0) {
        let { title, subTitle, content } = res.data
        setHtml(content)
        setTitle(title)
        setSubTitle(subTitle)
      }
    })
  }

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
              title: title,
              subTitle: subTitle,
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
