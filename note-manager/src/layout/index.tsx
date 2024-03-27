import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet,useNavigate  } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const a = ['/statistics','/person','2','/publish'];
const b = ['统计分析','人员管理','笔记管理','上传笔记'];
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: a[index],
    icon: React.createElement(icon),
    label: b[index],
  }),
);


const MyLayout = ()=>{
    const nav = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <Layout style={{minHeight: '100vh',}}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="demo-logo-vertical" style={{height: '32px',margin:'16px',background:'rgba(255, 255, 255, .2)',borderRadius: '6px'}}/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} onSelect={({item,key})=>{nav(key);
            }}/>
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>欢迎使用笔记管理系统</Header>
            <Content style={{ margin: '24px 16px 0' }}>
                {<Outlet/>}   
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      );
}
export default MyLayout