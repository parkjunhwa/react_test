import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  HomeOutlined, 
  FormOutlined,
  TableOutlined,
  MessageOutlined,
  MenuOutlined,
  EditOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Link, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">홈</Link>,
    },
    {
      key: 'data-entry',
      icon: <EditOutlined />,
      label: 'Data Entry',
      children: [
        {
          key: '/data-entry',
          label: <Link to="/data-entry">입력 컴포넌트</Link>,
        },
        {
          key: '/form-example',
          label: <Link to="/form-example">폼 예제</Link>,
        },
      ],
    },
    {
      key: 'data-display',
      icon: <TableOutlined />,
      label: 'Data Display',
      children: [
        {
          key: '/data-display',
          label: <Link to="/data-display">데이터 표시</Link>,
        },
      ],
    },
    {
      key: 'feedback',
      icon: <MessageOutlined />,
      label: 'Feedback',
      children: [
        {
          key: '/feedback',
          label: <Link to="/feedback">피드백</Link>,
        },
      ],
    },
    {
      key: 'navigation',
      icon: <MenuOutlined />,
      label: 'Navigation',
      children: [
        {
          key: '/navigation',
          label: <Link to="/navigation">네비게이션</Link>,
        },
      ],
    },
    {
      key: 'other',
      icon: <AppstoreOutlined />,
      label: 'Other',
      children: [
        {
          key: '/other',
          label: <Link to="/other">기타 컴포넌트</Link>,
        },
      ],
    },
  ];

  return (
    <StyledLayout>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={0}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Logo>React App</Logo>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['data-entry', 'data-display', 'feedback', 'navigation', 'other']}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export default MainLayout; 