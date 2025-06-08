import React from 'react';
import { Table, List, Card, Avatar, Tag, Space, Typography, Row, Col } from 'antd';
import { UserOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './DataDisplayPage.module.scss';

const { Title, Paragraph } = Typography;

const DataDisplayPage: React.FC = () => {
  // Table 데이터
  const tableData = [
    {
      key: '1',
      name: '홍길동',
      age: 32,
      address: '서울시 강남구',
      tags: ['개발자', '프론트엔드'],
    },
    {
      key: '2',
      name: '김철수',
      age: 42,
      address: '서울시 서초구',
      tags: ['디자이너', 'UI/UX'],
    },
    {
      key: '3',
      name: '이영희',
      age: 28,
      address: '서울시 송파구',
      tags: ['개발자', '백엔드'],
    },
  ];

  const tableColumns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
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
  ];

  // List 데이터
  const listData = [
    {
      title: 'React 공식 문서',
      description: 'React의 공식 문서를 통해 기본 개념을 학습하세요.',
      avatar: 'R',
    },
    {
      title: 'TypeScript 핸드북',
      description: 'TypeScript의 타입 시스템과 고급 기능을 알아보세요.',
      avatar: 'T',
    },
    {
      title: 'Ant Design 가이드',
      description: 'Ant Design 컴포넌트의 사용법과 예제를 확인하세요.',
      avatar: 'A',
    },
  ];

  // Card 데이터
  const cardData = [
    {
      title: '프로젝트 A',
      description: 'React와 TypeScript를 사용한 웹 애플리케이션',
      likes: 156,
      messages: 23,
      stars: 45,
    },
    {
      title: '프로젝트 B',
      description: 'Node.js와 Express를 활용한 백엔드 서버',
      likes: 89,
      messages: 12,
      stars: 34,
    },
    {
      title: '프로젝트 C',
      description: 'MongoDB를 활용한 데이터베이스 설계',
      likes: 234,
      messages: 45,
      stars: 67,
    },
  ];

  return (
    <div className={styles.container}>
      <Title level={2}>Data Display 컴포넌트</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="Table 예제" className={styles.card}>
            <Table columns={tableColumns} dataSource={tableData} />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="List 예제" className={styles.card}>
            <List
              itemLayout="horizontal"
              dataSource={listData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{item.avatar}</Avatar>}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Card 예제" className={styles.card}>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={cardData}
              renderItem={item => (
                <List.Item>
                  <Card hoverable>
                    <Card.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <div className={styles.cardActions}>
                      <Space>
                        <span>
                          <LikeOutlined /> {item.likes}
                        </span>
                        <span>
                          <MessageOutlined /> {item.messages}
                        </span>
                        <span>
                          <StarOutlined /> {item.stars}
                        </span>
                      </Space>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataDisplayPage; 