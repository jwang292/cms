import React, { useState, useEffect } from 'react'
import './less/list.less'
import { List, Skeleton, Pagination, Button, message } from 'antd'
import { ArticleListApi, ArticleDeleteApi } from '../request/api'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
export default function Lists() {
  const [list, setList] = useState([])
  const navigate = useNavigate([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [flag, setFlag] = useState([])
  const getList = (num) => {
    ArticleListApi({ num, count: pageSize }).then((res) => {
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }

  useEffect(() => {
    getList(current)
  }, [flag])

  const onChange = (pages) => {
    getList(pages)
  }

  const delFn = (id) => {
    ArticleDeleteApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
        setFlag(flag + 1)
      } else {
        message.error(res.message)
      }
    })
  }

  return (
    <div className="list" style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => {
                  navigate('/edit/' + item.id)
                }}
              >
                edit
              </Button>,
              <Button type="danger" onClick={() => delFn(item.id)}>
                delete
              </Button>,
            ]}
          >
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a href="!#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format('YYYY-MM-DD')}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination
        onChange={onChange}
        total={10}
        style={{ float: 'right', marginTop: '20px' }}
      ></Pagination>
    </div>
  )
}
