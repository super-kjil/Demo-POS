import React from 'react'
import {Form,Button, Input, Modal, Space} from "antd"
import { request } from '../../util/helper';
import {setAccessToken, setProfile} from "../../store/profile.store.js"
import { useNavigate } from "react-router-dom";

function LoginPage () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onLogin = async (item) => {
    const param = {
      username: item.username,
      password: item.password,
    };
  const res = await request("auth/login", "post", param);
  if (res && !res.error) {
    //alert(JSON.stringify(res))
    setAccessToken(res.access_token);
    setProfile(JSON.stringify(res.profile));  
    navigate("/");
  }else{
    alert(JSON.stringify(res))
  }
    
  }
  return (
    <div>
      <h2>Login</h2>
       <Form layout='vertical' form={form} onFinish={onLogin} >
          <Form.Item name="username" label="Username">
            <Input placeholder='Username'/>
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder='Password'/>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Space>
          </Form.Item>
       </Form>
    </div>
  )
}

export default LoginPage