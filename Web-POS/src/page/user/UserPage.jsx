import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { resetWarned } from "antd/es/_util/warning";
function UserPage() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    list: [],
    role: [],
    loading: false,
    visible: false,
  });
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await request("auth/getlist", "get");
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        role: res.role,
      }));
    }
  };

  const clickBtnEdit = (item) => {
    form.setFieldsValue({
      ...item,
      // id : item.id,
      // code : item.code,
      // name : item.name,
    });
    handleOpenModal();
  };


  const clickBtnDelete = (item) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure to remove?",
      onOk: async () => {
        const res = await request("role", "delete", {
          id: item.id,
        });
        if (res && !res.error) {
          message.success(res.message);
          const newList = state.list.filter((item1) => item1.id != item.id);
          setState((pre) => ({
            ...pre,
            list: newList,
          }));
        }
      },
    });
  };

  const handleCloseModal = () => {
    setState((pre) => ({
      ...pre,
      visible: false,
    }));
    form.resetFields();
  };

  const handleOpenModal = () => {
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };
  // {"name":"a","username":"b","password":"12","role_id":2,"is_active":0}
  // const onFinish = async (item) => {
  //   if (item.password !== item.confirm_password) {
  //     message.warning("Password and Confirm Password Not Match!");
  //     return;
  //   }
  //   var data = {
  //     ...item,
  //   };
  //   const res = await request("auth/register", "post", data);
  //   if (res && !res.error) {
  //     message.success(res.message);
  //     getList();
  //     handleCloseModal();
  //   } else {
  //     message.warning(res.message);
  //   }
  // };
  const onFinish = async (item) => {
    var data = {
      id: form.getFieldValue("id"),
      role_id: item.role_id,
      name: item.name,
      username: item.username,
      password: item.password,
      is_active: item.is_active,
    };
    var method = "post";
    if (form.getFieldValue("id")) {
      method = "put";
    }
    const res = await request("auth/register", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      handleCloseModal();
    } else {
      message.warning(res.error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>User</div>
          <Input.Search style={{ marginLeft: 10 }} placeholder="Search" />
        </div>
        <Button type="primary" onClick={handleOpenModal}>
          New
        </Button>
      </div>
      <Modal
        title={form.getFieldValue("id") ? "Update User" : "New User"}
        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please fill in name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name={"username"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please fill in email",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="password"
            rules={[
              {
                required: true,
                message: "Please fill in password",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item
            name={"confirm_password"}
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please fill in confirm password",
              },
            ]}
          >
            <Input.Password placeholder="confirm password" />
          </Form.Item>
          <Form.Item
            name={"role_id"}
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select placeholder="Select Role" options={state.role} />
          </Form.Item>
          <Form.Item
            name={"is_active"}
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Select
              placeholder="Select Status"
              options={[
                {
                  label: "Active",
                  value: 1,
                },
                {
                  label: "InActive",
                  value: 0,
                },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Table 
        className="table-body"
        dataSource={state.list}
        columns={[
          {
            key: "no",
            title: "No",
            render: (value, data, index) => index + 1,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "username",
            title: "Username",
            dataIndex: "username",
          },
          {
            key: "role_name",
            title: "Role Name",
            dataIndex: "role_name",
          },
          {
            key: "is_active",
            title: "Status",
            dataIndex: "is_active",
            render: (value) =>
              value ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">In Active</Tag>
              ),
          },
          {
            key: "create_by",
            title: "Create By",
            dataIndex: "create_by",
          },
          {
            key: "action",
            title: "Action",
            align: "center",
            render: (value, data) => (
              <Space>
                <Button onClick={() => clickBtnEdit(data)} type="primary">
                  Edit
                </Button>
                <Button
                  onClick={() => clickBtnDelete(data)}
                  danger
                  type="primary"
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}

export default UserPage;