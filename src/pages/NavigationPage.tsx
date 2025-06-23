import React, { useState } from 'react';
import { 
  Menu, 
  Tabs, 
  Breadcrumb, 
  Steps, 
  Pagination, 
  Card, 
  Row, 
  Col, 
  Typography,
  Space,
  Button
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MailOutlined,
  AppstoreOutlined,
  TeamOutlined,
  FileOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import styles from './NavigationPage.module.scss';

const { Title } = Typography;
const { TabPane } = Tabs;

const NavigationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Steps 예제 데이터
  const steps = [
    {
      title: '첫 번째',
      description: '시작하기',
    },
    {
      title: '두 번째',
      description: '진행 중',
    },
    {
      title: '세 번째',
      description: '거의 완료',
    },
    {
      title: '마지막',
      description: '완료',
    },
  ];

  return (
    <div className={styles.container}>
      <Title level={2}>Navigation 컴포넌트</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Menu 예제" className={styles.card}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ width: '100%' }}
            >
              <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="사용자">
                <Menu.Item key="1">프로필</Menu.Item>
                <Menu.Item key="2">설정</Menu.Item>
                <Menu.Item key="3">로그아웃</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub2" icon={<AppstoreOutlined />} title="앱">
                <Menu.Item key="4">대시보드</Menu.Item>
                <Menu.Item key="5">알림</Menu.Item>
                <Menu.Item key="6">메시지</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="7" icon={<SettingOutlined />}>
                설정
              </Menu.Item>
            </Menu>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Tabs 예제" className={styles.card}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><HomeOutlined />홈</span>} key="1">
                홈 탭 내용
              </TabPane>
              <TabPane tab={<span><MailOutlined />메시지</span>} key="2">
                메시지 탭 내용
              </TabPane>
              <TabPane tab={<span><TeamOutlined />팀</span>} key="3">
                팀 탭 내용
              </TabPane>
              <TabPane tab={<span><FileOutlined />파일</span>} key="4">
                파일 탭 내용
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Breadcrumb 예제" className={styles.card}>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <DashboardOutlined />
                <span>대시보드</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>현재 페이지</Breadcrumb.Item>
            </Breadcrumb>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Steps 예제" className={styles.card}>
            <Steps
              current={currentStep}
              items={steps}
            />
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Space>
                <Button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  이전
                </Button>
                <Button
                  type="primary"
                  disabled={currentStep === steps.length - 1}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  다음
                </Button>
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="Pagination 예제" className={styles.card}>
            <Pagination
              total={100}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `총 ${total}개 항목`}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NavigationPage; 