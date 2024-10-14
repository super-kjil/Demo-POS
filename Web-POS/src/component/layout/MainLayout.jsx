import React, { useState } from 'react';
import "./MainLayout.css"
import logo from "../../assets/bot-black.svg.jpeg"
import user from "../../assets/user.jpg"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { IoMail } from "react-icons/io5";
const { Header, Content, Footer, Sider } = Layout;


const items = [
    {
        key : "dashboard",
        label : "Dashboard",
        icon : <UserOutlined />,
        children: null,
    },
    {
      key : "employee",
      label : "Employee",
      icon : <UserOutlined />,
      children: null,
    },
    {
        key : "customer",
        label : "Customer",
        icon : <UserOutlined />,
        children: null,
    },
    {
        key : "product",
        label : "Product",
        icon : <PieChartOutlined/>,
        children: [
            {
              key: "category",
              label: "Category",
              icon: <PieChartOutlined/>,
              children: null,
            },
            {
                key: "stock1",
                label: "Stock1",
                icon: <PieChartOutlined/>,
                children: null,
            },
            {
              key: "stock2",
              label: "Stock2",
              icon: <PieChartOutlined/>,
              children: null,
            }
          ],

    },
]
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navegate = useNavigate();
  const onClickMenu = (item) => {
    navegate(item.key);
  };


  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']}
            mode="inline" 
            items={items} 
            onClick={onClickMenu}
            />
      </Sider>
      <Layout>
        <div className = "admin-header">
            <div className='admin-header-g1'>
                <div>
                    <img className='admin-logo' src={logo} alt='logo'/>
                </div>
                <div>
                    <div className='txt-brand-name'>POS</div>
                    <div>Description</div>
                </div>
                
                <div className='search-box'>
                  <Input.Search
                    placeholder='Search'
                  />
                </div>
            </div>
            
            <div className='admin-header-g2'>
                <IoIosNotifications className='icon-notify'/>
                <IoMail className='icon-mail'/>
                <div>
                    <div className='txt-username'>Your Name</div>
                    <div>Role</div> 
                </div>
                <div>
                    <img className="img-user" src={user} alt='logo'/>    
                </div>
            </div>
        </div>
        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            className='admin-body'
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default MainLayout;