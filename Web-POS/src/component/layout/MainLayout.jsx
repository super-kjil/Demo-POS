import React, { useEffect, useState } from 'react';
import "./MainLayout.css"
import logo from "../../assets/bot-black.svg.jpeg"
import user from "../../assets/user.jpg"
import { FaUsers ,FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney ,MdCurrencyExchange} from "react-icons/md";
import { HiLanguage } from "react-icons/hi2";
import { GoPasskeyFill } from "react-icons/go";
import { GiBuyCard } from "react-icons/gi";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SmileOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  BulbFilled,
  HomeOutlined,
  ProductOutlined,
  ControlOutlined,

} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input ,Dropdown,Space,} from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { IoMail ,IoReceipt} from "react-icons/io5";
import {getProfile, setAccessToken, setProfile} from "../../store/profile.store"



const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "",
    label: "Dashabord",
    children: null,
    icon: <HomeOutlined />
  },
  {
    key: "pos",
    label: "POS",
    icon: <IoReceipt />,
    children: null,
  },
  {
    key: "customer",
    label: "Customer",
    children: null,
    icon: <UserOutlined/>
  },
  {
    key: "order",
    label: "Order",
    icon: <FaShoppingCart />,
    children: null,

  },
  {
    key: "product",
    label: "Product",
    icon: <ProductOutlined />,
    children: [
      {
        key: "product",
        label: "List Porduct",
        children: null,
      },
      {
        key: "category",
        label: "Category",
        children: null,
      },
    ],
  },
  {
    key: "purchase",
    label: "Purchase",
    icon: <GiBuyCard />,
    children: [
      {
        key: "supplier",
        label: "Supplier",
        children: null,
      },
      {
        key: "purchase",
        label: "List purchase",
        children: null,
      },
      {
        key: "purchase_product",
        label: "Purchase Product",
        children: null,
      },
    ],
  },
  {
    key: "expanse",
    label: "Expanse",
    icon: <MdAttachMoney/>,
    children: [
      {
        key: "expanse_type",
        label: "Expanse Type",
        children: null,
      },
      {
        key: "expanse",
        label: "Expanse",
        children: null,
      },
    ],
  },
  {
    key: "employee",
    label: "Employee",
    icon: <FaUsers />,
    children: [
      {
        key: "employee",
        label: "Employee",
        children: null,
      },
      {
        key: "payroll",
        label: "Payroll",
        children: null,
      },
    ],
  },

  {
    key: "user",
    label: "User",
    icon: <UserOutlined />,
    children: [
      {
        key: "user",
        label: "User",
        icon: <UserOutlined />,
        children: null,
      },
      {
        key: "role",
        label: "Role",
        icon: <ControlOutlined />,
        children: null,
      },
      {
        key: "role_permission",
        label: "Role Permmission",
        icon: <GoPasskeyFill />,
        children: null,
      },
    ],
  },

  {
    key: "Setting",
    label: "Setting",
    icon: <SettingOutlined/>,
    children: [
      {
        key: "Currency",
        label: "Currency",
        icon: <MdCurrencyExchange />,
        children: null,
      },
      {
        key: "langauge",
        label: "Langauge",
        icon: <HiLanguage />,
        children: null,
      },
    ],
  },
];
  const MainLayout = () => {  
  const profile = getProfile();
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  const navigate = useNavigate();
  const onClickMenu = (item) => {
    navigate(item.key);
  };

  const onLogOut = () => {
    setProfile("");
    setAccessToken("");
    navigate("/login");
  };

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
  }, []);

  

  if (!profile){
    return null;
  }

  const itemsDropdown = [
    {
      icon: <UserOutlined />,
      key: 'profile',
      label: "Profile"
    },
    {
      key: 'setting',
      label: "Setting",
      icon: <SettingOutlined />,
    },
    {
      danger: true,
      icon: <LogoutOutlined />,
      label: 'Logout',
      key: 'logout',
    },
  ];
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
                    <div className='txt-username'>{profile?.name}</div>
                    <div>{profile.role_name}</div> 
                </div>
                <div>
                <Dropdown menu={{
                  items:itemsDropdown,
                  onClick:(event) => {
                    if (event.key == "logout") {
                      onLogOut();
                    }
                  }
                  }}>
                      <img className="img-user" src={user} alt='logo'/>  
                </Dropdown>
                      
                </div>
            </div>
        </div>
        <Content
          className='content-body'
        >

          <div 
            className='admin-body'
            // style={{
            //   background  : colorBgContainer,
            //   borderRadius: borderRadiusLG,
            // }}
          >
            <Outlet/>
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default MainLayout;