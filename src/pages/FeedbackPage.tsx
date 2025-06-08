import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  message, 
  notification, 
  Progress, 
  Alert, 
  Space, 
  Typography,
  Card,
  Row,
  Col
} from 'antd';
import { 
  ExclamationCircleOutlined, 
  SmileOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import styles from './FeedbackPage.module.scss';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const FeedbackPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Modal 관련 함수들
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success('Modal이 닫혔습니다!');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    message.info('Modal이 취소되었습니다.');
  };

  // Confirm Modal
  const showConfirmModal = () => {
    confirm({
      title: '정말 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '이 작업은 되돌릴 수 없습니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        message.success('삭제되었습니다.');
      },
    });
  };

  // Message 예제
  const showMessages = () => {
    message.success('성공 메시지입니다!');
    message.error('에러 메시지입니다!');
    message.warning('경고 메시지입니다!');
    message.info('정보 메시지입니다!');
  };

  // Notification 예제
  const showNotifications = () => {
    notification.open({
      message: '알림 제목',
      description: '알림 내용입니다.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });

    notification.success({
      message: '성공 알림',
      description: '작업이 성공적으로 완료되었습니다.',
    });

    notification.error({
      message: '에러 알림',
      description: '작업 중 오류가 발생했습니다.',
    });
  };

  // Progress 예제
  const startProgress = () => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className={styles.container}>
      <Title level={2}>Feedback 컴포넌트</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Modal 예제" className={styles.card}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" onClick={showModal}>
                기본 Modal 열기
              </Button>
              <Button danger onClick={showConfirmModal}>
                확인 Modal 열기
              </Button>
            </Space>

            <Modal
              title="기본 Modal"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Modal 내용입니다.</p>
              <p>확인 또는 취소 버튼을 클릭하여 닫을 수 있습니다.</p>
            </Modal>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Message & Notification" className={styles.card}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button onClick={showMessages}>
                Message 보여주기
              </Button>
              <Button onClick={showNotifications}>
                Notification 보여주기
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Progress" className={styles.card}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Progress percent={progress} />
              <Button onClick={startProgress}>
                진행 시작
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Alert" className={styles.card}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="성공 메시지"
                description="작업이 성공적으로 완료되었습니다."
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
              />
              <Alert
                message="정보 메시지"
                description="이것은 정보성 메시지입니다."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
              />
              <Alert
                message="경고 메시지"
                description="주의가 필요한 내용입니다."
                type="warning"
                showIcon
                icon={<WarningOutlined />}
              />
              <Alert
                message="에러 메시지"
                description="오류가 발생했습니다."
                type="error"
                showIcon
                icon={<ExclamationCircleOutlined />}
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FeedbackPage; 