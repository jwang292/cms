import React, { useState, useEffect } from 'react'
import './less/list.less'
import { List, Skeleton, Pagination, Button } from 'antd'
import { ArticleListApi } from '../request/api'

export default function Lists() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)
  const [pageSize, setPageSize] = useState(0)

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
  }, [])

  const onChange = (pages) => {
    getList(pages)
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
              <Button type="primary">edit</Button>,
              <Button type="danger">delete</Button>,
            ]}
          >
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a href="!#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{item.date}</div>
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
