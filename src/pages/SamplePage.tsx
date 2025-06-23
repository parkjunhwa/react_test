import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Table,
  Tag,
  Progress,
  Statistic,
  Alert,
  Divider,
  List,
  Avatar,
  Badge,
  Timeline,
  Steps,
  Tabs,
  Collapse,
  Descriptions,
  Result,
  Empty,
  Skeleton,
  Spin,
  Modal,
  message,
  notification
} from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  HeartOutlined,
  LikeOutlined,
  DislikeOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  PlusOutlined,
  MinusOutlined,
  ReloadOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined as SuccessOutlined,
  CloseCircleOutlined as ErrorOutlined
} from '@ant-design/icons';
import styles from './SamplePage.module.scss';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  status: 'active' | 'inactive' | 'pending';
}

const SamplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 테이블 데이터
  const dataSource: DataItem[] = [
    {
      key: '1',
      name: '김철수',
      age: 32,
      address: '서울시 강남구',
      tags: ['개발자', 'React'],
      status: 'active'
    },
    {
      key: '2',
      name: '이영희',
      age: 28,
      address: '서울시 서초구',
      tags: ['디자이너', 'UI/UX'],
      status: 'active'
    },
    {
      key: '3',
      name: '박민수',
      age: 35,
      address: '부산시 해운대구',
      tags: ['프로젝트 매니저'],
      status: 'pending'
    },
    {
      key: '4',
      name: '정수진',
      age: 29,
      address: '대구시 수성구',
      tags: ['개발자', 'Node.js'],
      status: 'inactive'
    }
  ];

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '나이',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '태그',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        let color = 'green';
        let text = '활성';
        if (status === 'inactive') {
          color = 'red';
          text = '비활성';
        } else if (status === 'pending') {
          color = 'orange';
          text = '대기중';
        }
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: '액션',
      key: 'action',
      render: (_: any, record: DataItem) => (
        <Space size="middle">
          <a>수정</a>
          <a>삭제</a>
        </Space>
      ),
    },
  ];

  // 리스트 데이터
  const listData = [
    {
      title: 'React 18 새로운 기능',
      description: 'React 18에서 추가된 새로운 기능들을 살펴보세요.',
      avatar: <Avatar icon={<UserOutlined />} />,
      content: 'Concurrent Features, Automatic Batching, Suspense on the Server 등...',
    },
    {
      title: 'TypeScript 베스트 프랙티스',
      description: 'TypeScript를 효과적으로 사용하는 방법을 알아보세요.',
      avatar: <Avatar icon={<UserOutlined />} />,
      content: '타입 정의, 인터페이스, 제네릭 등을 활용한 안전한 코드 작성법...',
    },
    {
      title: 'Ant Design 컴포넌트 활용',
      description: 'Ant Design의 다양한 컴포넌트를 활용한 UI 개발.',
      avatar: <Avatar icon={<UserOutlined />} />,
      content: 'Form, Table, Modal, Notification 등 실무에서 자주 사용하는 컴포넌트들...',
    },
  ];

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    message.success('모달이 닫혔습니다!');
  };

  const handleCancel = () => {
    setModalVisible(false);
    message.info('모달이 취소되었습니다.');
  };

  const showNotification = () => {
    notification.success({
      message: '성공 알림',
      description: '작업이 성공적으로 완료되었습니다!',
      placement: 'topRight',
    });
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('로딩이 완료되었습니다!');
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className={styles.container}>
      <Title level={2}>📋 샘플 페이지</Title>
      <Paragraph>
        이 페이지는 Ant Design의 다양한 컴포넌트들을 보여주는 샘플 페이지입니다.
        실제 프로젝트에서 활용할 수 있는 다양한 UI 패턴들을 확인해보세요.
      </Paragraph>

      {/* 통계 카드 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 사용자"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 주문"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 매출"
              value={11280}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="성공률"
              value={93.2}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 알림 및 진행률 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="시스템 알림" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="정보 알림"
                description="이것은 정보 알림 메시지입니다."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
              />
              <Alert
                message="성공 알림"
                description="작업이 성공적으로 완료되었습니다!"
                type="success"
                showIcon
                icon={<SuccessOutlined />}
              />
              <Alert
                message="경고 알림"
                description="주의가 필요한 사항이 있습니다."
                type="warning"
                showIcon
                icon={<WarningOutlined />}
              />
              <Alert
                message="오류 알림"
                description="오류가 발생했습니다. 다시 시도해주세요."
                type="error"
                showIcon
                icon={<ErrorOutlined />}
              />
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="진행률" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text>프로젝트 진행률</Text>
                <Progress percent={75} status="active" />
              </div>
              <div>
                <Text>개발 완료도</Text>
                <Progress percent={90} strokeColor="#52c41a" />
              </div>
              <div>
                <Text>테스트 진행률</Text>
                <Progress percent={60} strokeColor="#1890ff" />
              </div>
              <div>
                <Text>배포 준비</Text>
                <Progress percent={30} strokeColor="#faad14" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 탭과 콜랩스 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="탭 예제">
            <Tabs defaultActiveKey="1">
              <TabPane tab="탭 1" key="1">
                <p>첫 번째 탭의 내용입니다.</p>
                <p>여기에 다양한 컴포넌트들을 배치할 수 있습니다.</p>
              </TabPane>
              <TabPane tab="탭 2" key="2">
                <p>두 번째 탭의 내용입니다.</p>
                <Button type="primary">버튼 예제</Button>
              </TabPane>
              <TabPane tab="탭 3" key="3">
                <p>세 번째 탭의 내용입니다.</p>
                <Tag color="blue">태그 예제</Tag>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="콜랩스 예제">
            <Collapse defaultActiveKey={['1']}>
              <Panel header="섹션 1" key="1">
                <p>첫 번째 섹션의 내용입니다.</p>
                <Text type="secondary">보조 텍스트 예제</Text>
              </Panel>
              <Panel header="섹션 2" key="2">
                <p>두 번째 섹션의 내용입니다.</p>
                <Badge count={5}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </Panel>
              <Panel header="섹션 3" key="3">
                <p>세 번째 섹션의 내용입니다.</p>
                <Space>
                  <Button size="small">작은 버튼</Button>
                  <Button size="small" type="primary">주요 버튼</Button>
                </Space>
              </Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>

      {/* 테이블 */}
      <Card title="사용자 목록" style={{ marginBottom: 24 }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          loading={loading}
        />
      </Card>

      {/* 리스트와 타임라인 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="최근 게시물">
            <List
              itemLayout="horizontal"
              dataSource={listData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.avatar}
                    title={<a href="#">{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="활동 타임라인">
            <Timeline>
              <Timeline.Item color="green">
                <p>프로젝트 시작</p>
                <p>2024-01-15 09:00</p>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <p>개발 환경 설정 완료</p>
                <p>2024-01-16 14:30</p>
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>중요 버그 발견</p>
                <p>2024-01-17 11:20</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>버그 수정 완료</p>
                <p>2024-01-18 16:45</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* 스텝과 액션 버튼 */}
      <Card title="단계별 진행" style={{ marginBottom: 24 }}>
        <Steps current={currentStep}>
          <Step title="계획" description="프로젝트 계획 수립" />
          <Step title="개발" description="개발 진행" />
          <Step title="테스트" description="테스트 수행" />
          <Step title="배포" description="배포 완료" />
        </Steps>
        <Divider />
        <Space>
          <Button disabled={currentStep === 0} onClick={prevStep}>
            이전
          </Button>
          <Button type="primary" disabled={currentStep === 3} onClick={nextStep}>
            다음
          </Button>
        </Space>
      </Card>

      {/* 액션 버튼들 */}
      <Card title="다양한 액션 버튼">
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            추가
          </Button>
          <Button icon={<MinusOutlined />}>
            삭제
          </Button>
          <Button type="dashed" icon={<ReloadOutlined />} onClick={handleLoading}>
            새로고침
          </Button>
          <Button type="text" icon={<SettingOutlined />}>
            설정
          </Button>
          <Button type="link" icon={<InfoCircleOutlined />}>
            정보
          </Button>
          <Button danger icon={<ExclamationCircleOutlined />}>
            위험
          </Button>
          <Button onClick={handleShowModal}>
            모달 열기
          </Button>
          <Button onClick={showNotification}>
            알림 표시
          </Button>
        </Space>
      </Card>

      {/* 모달 */}
      <Modal
        title="샘플 모달"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
      >
        <p>이것은 샘플 모달입니다.</p>
        <p>모달 안에서 다양한 컴포넌트를 사용할 수 있습니다.</p>
        <Descriptions bordered size="small">
          <Descriptions.Item label="제목">샘플 모달</Descriptions.Item>
          <Descriptions.Item label="상태">활성</Descriptions.Item>
          <Descriptions.Item label="생성일">2024-01-15</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default SamplePage; 