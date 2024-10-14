import React, { useEffect, useState } from 'react'
import { request } from '../../util/helper'
import {Table} from "antd"

function CategoryPage() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList()
  },[])
  const getList = async () => {
    const res = await request ("category")
    if (res) {
      setList(res.list)
    }
  }
  return (
    <div>
      <Table
        dataSource={list}
        columns={[
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "Description",
            title: "Description",
            dataIndex: "description",
          },
        ]}
      />
    </div>
  )
}

export default CategoryPage