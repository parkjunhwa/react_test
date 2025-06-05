import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import styles from './HomePage.module.scss';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        React + TypeScript + Ant Design 데모
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card title="시작하기" className={styles.card}>
            <Paragraph>
              이 프로젝트는 React, TypeScript, Ant Design을 사용한 웹 애플리케이션 데모입니다.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="기능" className={styles.card}>
            <Paragraph>
              • 반응형 레이아웃
              <br />
              • 폼 예제
              <br />
              • 라우팅
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="기술 스택" className={styles.card}>
            <Paragraph>
              • React
              <br />
              • TypeScript
              <br />
              • Ant Design
              <br />
              • React Router
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage; 