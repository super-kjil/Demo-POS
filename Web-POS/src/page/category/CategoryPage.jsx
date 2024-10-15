import React, { useEffect, useState } from 'react'
import { request } from '../../util/helper'
import {Button, Table, Tag, Space, Modal, Input,Form, Select, message, } from "antd"
import { MdDelete, MdEdit, MdAdd  } from "react-icons/md";

function CategoryPage() {
  const [formRef] = Form.useForm()
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
    setState({
      ...state,
      visibleModal: true,
    });
    formRef.setFieldsValue({
      Id: data.Id, // hiden id (save? | update?)
      Name: data.Name,
      Description: data.Description,
      Status: data.Status,
    });
    //console.log(data);
  }
  const onClickDelete = async (data, index) => {
    Modal.confirm({
      title : "Delete!",
      description : "Are you sure to delete?",
      okType : "Yes",
      onOk: async () => {
        const res = await request ("category" , "delete", {
          Id : data.Id,
        });
        //console.log(data);
        if (res && !res.error) {
          const newList = list.filter((item) => item.Id != data.Id);
          setList(newList);
          message.success(res.message)
        }
      }
    })     
  };
  
  const onclickAddbtn = () => {
    setState({
      ...state,
      visibleModal: true,
    })
  }
  const oncloseModal = () => {
    formRef.resetFields();
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
  const onFinish = async (items) => {
    var data = {
      Id : formRef.getFieldValue("Id"), 
      Name : items.Name,
      Description : items.Description,
      Status : items.Status,
      ParentId : items.ParentId
    };
    var method = "post";
    if (formRef.getFieldValue("Id")) {
      method = "put";
    }
    const res = await request("category", method, data);
    if (res && !res.error) {
        message.success(res.message);
        getList();
        oncloseModal();
    }

    //alert(JSON.stringify(res))


  }
  return (
    <div>
      <Button type='primary' icon={<MdAdd/>}
      onClick={onclickAddbtn}
      style={{marginBottom:10}}
      >
      New
      </Button>
      <Modal  
        open={state.visibleModal}
        title= {formRef.getFieldValue("Id") ? "Edit Category" : "New Category"}
        footer={null}
        onCancel={oncloseModal}
        >
          <Form 
            layout='vertical'
            onFinish={onFinish}
            form = {formRef}
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
              <Button type="primary" htmlType='submit'>
                {formRef.getFieldValue("Id") ? "Update" : "Save"}
              </Button>
          </Space>
          </Form>
          
      </Modal>
      <Table
        dataSource={list}
        columns={[
          {
            key: "No",
            title: "No",
            render : (index) => index + 1,
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