import React, { useEffect, useState } from 'react'
import { request } from '../../util/helper'
import {Button, Table, Tag, Space, Modal, Input, Descriptions,Form, Select,} from "antd"
import { MdDelete, MdEdit, MdAdd  } from "react-icons/md";

function CategoryPage() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList()
  },[])
  const getList = async () => {
    const res = await request ("category",)
    if (res) {
      setList(res.list)
    }
  }
  const [state, setState] = useState({
    visibleModal : false,
    id : null,
    name : "",
    description : "",
    status : "",
    parentId : null,
  })
  const onClickEdit = (data,index) => {
    setState ({
      ...state,
      visibleModal : true,
      id : data.Id,
      name : data.Name,
      description : data.Description,
      status : data.Status, 
    })
    //console.log(data);
  }
  const onClickDelete = async (data, index) => {
    const res = await request ("category" , "delete", {
      Id : data.Id,
    })
    console.log(data);
  }
  const onclickAddbtn = () => {
    setState({
      ...state,
      visibleModal: true,
    })
  }
  const oncloseModal = () => {
    setState({
      ...state,
      id : null,
      visibleModal: false,
    })
  }
  const onSave = async () => {
    var data = {
      Id: state.id,
      Name : state.name,
      Description : state.description,
      Status : state.status,
      ParentId : state.parentId
    };
    if(state.id == null){
      const res = await request("category", "post", data);

    }else {
      const res = await request("category", "put", data);
    }
  } 
  const onFinish = (items) => {
    console.log(JSON.stringify(items))
  }
  return (
    <div>
      <Button type='primary' icon={<MdAdd/>}
      onClick={onclickAddbtn}
      >
      Add New
      </Button>
      <Modal  
        open={state.visibleModal}
        title="Add New Category"
        footer={null}
        onCancel={oncloseModal}
        >
       {/* <Input placeholder='Name'
       value={state.name}
          onChange={(e) => setState({
            ...state,
            name : e.target.value,
          })}
       />
       <Input placeholder='Descriptions'
       value={state.description}
        onChange={(e) => setState({
          ...state,
          description : e.target.value
        })}
       />
       <Input placeholder='Status'
       value={state.status}
        onChange={(e) => setState({
          ...state,
          status : e.target.value
        })}
       /> */}
          <Form 
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item name={"Name"} label="Category Name">
              <Input placeholder='Input Category Name'/>
            </Form.Item>
            <Form.Item name={"Description"} label="Category Description">
              <Input.TextArea placeholder='Input Category Description'/>
            </Form.Item>
            <Form.Item name={"Status"} label="Category Status">
              <Select
              placeholder="Select Status"
              options={[
                {
                  label : "Active",
                  value : 1,
                },
                {
                  label : "InActive",
                  value : 0,
                }
              ]}/>
            </Form.Item>
            <Space>
              <Button danger>Cancel</Button>
              <Button type="primary" htmlType='submit'>Save</Button>
          </Space>
          </Form>
          
      </Modal>
      <Table
        dataSource={list}
        columns={[
          {
            key: "No",
            title: "No",
            render : (index) => index++,
          },
          {
            key: "Name",
            title: "Name",
            dataIndex: "Name",
          },
          {
            key: "Description",
            title: "Description",
            dataIndex: "Description",
          },
          {
            key: "Status",
            title: "Status",
            dataIndex: "Status",
            render : (status) => status == 1 ? 
            (<Tag color="green">Active</Tag>) : (<Tag color="red"> Inactive</Tag>),
          },
          {
            key: "Action",
            title: "Action",
            align: "center",
            render : (data,index,item) => (
              <Space>
                <Button 
                  type='primary' 
                  icon={<MdEdit/>}
                  onClick={() =>onClickEdit(data,index)}
                />
                <Button 
                  type='primary' 
                  danger icon={<MdDelete/>}
                  onClick={() => onClickDelete(data,index)}
                />            
              </Space>
            )
          },
        ]}
      />
    </div>
  )
}

export default CategoryPage