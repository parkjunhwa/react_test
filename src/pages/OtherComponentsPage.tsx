import React, { useState } from 'react';
import {
  Calendar,
  Carousel,
  Collapse,
  Timeline,
  Tree,
  Card,
  Row,
  Col,
  Typography,
  Badge,
  Tag,
  Space,
  Button,
  Divider,
  Anchor,
  BackTop,
  Affix,
  Tooltip
} from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  DownOutlined,
  UpOutlined,
  SmileOutlined,
  HeartOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  RocketOutlined
} from '@ant-design/icons';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import styles from './OtherComponentsPage.module.scss';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Link } = Anchor;

const OtherComponentsPage: React.FC = () => {
  const [calendarMode, setCalendarMode] = useState<CalendarMode>('month');

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    setCalendarMode(mode);
  };

  const getListData = (value: Dayjs) => {
    const listData = [];
    const date = value.date();
    
    if (date === 8) {
      listData.push({ type: 'warning', content: '중요 미팅' });
      listData.push({ type: 'success', content: '프로젝트 마감일' });
    }
    if (date === 10) {
      listData.push({ type: 'error', content: '보고서 제출' });
    }
    if (date === 15) {
      listData.push({ type: 'warning', content: '팀 미팅' });
    }
    
    return listData;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  // Carousel 데이터
  const carouselItems = [
    {
      title: '첫 번째 슬라이드',
      content: 'React와 TypeScript를 사용한 웹 애플리케이션',
      color: '#108ee9',
    },
    {
      title: '두 번째 슬라이드',
      content: 'Ant Design 컴포넌트 라이브러리',
      color: '#52c41a',
    },
    {
      title: '세 번째 슬라이드',
      content: '모던한 UI/UX 디자인',
      color: '#722ed1',
    },
  ];

  // Timeline 데이터
  const timelineItems = [
    {
      color: 'green',
      children: '프로젝트 시작',
    },
    {
      color: 'blue',
      children: '기획 및 디자인',
    },
    {
      color: 'red',
      children: '개발 진행 중',
    },
    {
      color: 'gray',
      children: '테스트 및 배포',
    },
  ];

  // Tree 데이터
  const treeData = [
    {
      title: '프로젝트',
      key: '0',
      children: [
        {
          title: '프론트엔드',
          key: '0-0',
          children: [
            { title: 'React', key: '0-0-0' },
            { title: 'TypeScript', key: '0-0-1' },
            { title: 'Ant Design', key: '0-0-2' },
          ],
        },
        {
          title: '백엔드',
          key: '0-1',
          children: [
            { title: 'Node.js', key: '0-1-0' },
            { title: 'Express', key: '0-1-1' },
            { title: 'MongoDB', key: '0-1-2' },
          ],
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <Title level={2}>기타 컴포넌트</Title>
      <Text>Typography, Divider, Space, Anchor, BackTop, Affix, Calendar 등 다양한 컴포넌트 예제입니다.</Text>

      <Divider orientation="left">Typography</Divider>
      <Space direction="vertical">
        <Title>제목 1</Title>
        <Title level={2}>제목 2</Title>
        <Title level={3}>제목 3</Title>
        <Title level={4}>제목 4</Title>
        <Title level={5}>제목 5</Title>
        <Text>일반 텍스트</Text>
        <Text type="secondary">보조 텍스트</Text>
        <Text type="success">성공 텍스트</Text>
        <Text type="warning">경고 텍스트</Text>
        <Text type="danger">위험 텍스트</Text>
        <Text disabled>비활성화 텍스트</Text>
        <Text mark>마크 텍스트</Text>
        <Text code>코드 텍스트</Text>
        <Text keyboard>키보드 텍스트</Text>
        <Text underline>밑줄 텍스트</Text>
        <Text delete>삭제 텍스트</Text>
        <Text strong>굵은 텍스트</Text>
        <Text italic>기울임 텍스트</Text>
      </Space>

      <Divider orientation="left">Divider</Divider>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>일반 구분선</Text>
        <Divider />
        <Text>텍스트가 있는 구분선</Text>
        <Divider>구분선 텍스트</Divider>
        <Text>왼쪽 정렬 구분선</Text>
        <Divider orientation="left">왼쪽 텍스트</Divider>
        <Text>오른쪽 정렬 구분선</Text>
        <Divider orientation="right">오른쪽 텍스트</Divider>
        <Text>수직 구분선</Text>
        <Space>
          텍스트
          <Divider type="vertical" />
          텍스트
          <Divider type="vertical" />
          텍스트
        </Space>
      </Space>

      <Divider orientation="left">Space</Divider>
      <Space direction="vertical" size="large">
        <Space>
          <Button type="primary">버튼 1</Button>
          <Button>버튼 2</Button>
          <Button type="dashed">버튼 3</Button>
        </Space>
        <Space direction="vertical">
          <Button type="primary">버튼 1</Button>
          <Button>버튼 2</Button>
          <Button type="dashed">버튼 3</Button>
        </Space>
      </Space>

      <Divider orientation="left">Anchor</Divider>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Anchor
          items={[
            {
              key: 'typography',
              href: '#typography',
              title: 'Typography',
            },
            {
              key: 'divider',
              href: '#divider',
              title: 'Divider',
            },
            {
              key: 'space',
              href: '#space',
              title: 'Space',
            },
            {
              key: 'calendar',
              href: '#calendar',
              title: 'Calendar',
            },
          ]}
        />
        <div style={{ flex: 1 }}>
          <div id="typography">
            <Title level={3}>Typography 섹션</Title>
            <Text>Typography 컴포넌트 예제입니다.</Text>
          </div>
          <div id="divider">
            <Title level={3}>Divider 섹션</Title>
            <Text>Divider 컴포넌트 예제입니다.</Text>
          </div>
          <div id="space">
            <Title level={3}>Space 섹션</Title>
            <Text>Space 컴포넌트 예제입니다.</Text>
          </div>
          <div id="calendar">
            <Title level={3}>Calendar 섹션</Title>
            <Text>Calendar 컴포넌트 예제입니다.</Text>
          </div>
        </div>
      </div>

      <Divider orientation="left">BackTop</Divider>
      <div style={{ height: '200px', overflow: 'auto' }}>
        <div style={{ height: '1000px' }}>
          <Text>스크롤을 내려보세요. 오른쪽 하단에 BackTop 버튼이 나타납니다.</Text>
        </div>
        <BackTop>
          <div className={styles.backTop}>
            <UpOutlined />
          </div>
        </BackTop>
      </div>

      <Divider orientation="left">Affix</Divider>
      <Affix offsetTop={20}>
        <Button type="primary">상단에 고정된 버튼</Button>
      </Affix>
      <div style={{ height: '100px' }} />

      <Divider orientation="left">Calendar</Divider>
      <div className={styles.calendarContainer}>
        <Calendar 
          mode={calendarMode}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
        />
      </div>

      <Divider orientation="left">Badge</Divider>
      <Space size="large">
        <Badge count={5}>
          <div className={styles.badgeBox} />
        </Badge>
        <Badge count={0} showZero>
          <div className={styles.badgeBox} />
        </Badge>
        <Badge count={99}>
          <div className={styles.badgeBox} />
        </Badge>
        <Badge count={100} overflowCount={99}>
          <div className={styles.badgeBox} />
        </Badge>
        <Badge status="success" text="성공" />
        <Badge status="error" text="에러" />
        <Badge status="default" text="기본" />
        <Badge status="processing" text="처리중" />
        <Badge status="warning" text="경고" />
      </Space>

      <Divider orientation="left">Tooltip</Divider>
      <Space>
        <Tooltip title="기본 툴팁">
          <Button>기본</Button>
        </Tooltip>
        <Tooltip title="위쪽 툴팁" placement="top">
          <Button>위쪽</Button>
        </Tooltip>
        <Tooltip title="아래쪽 툴팁" placement="bottom">
          <Button>아래쪽</Button>
        </Tooltip>
        <Tooltip title="왼쪽 툴팁" placement="left">
          <Button>왼쪽</Button>
        </Tooltip>
        <Tooltip title="오른쪽 툴팁" placement="right">
          <Button>오른쪽</Button>
        </Tooltip>
      </Space>

      <Divider orientation="left">Tag</Divider>
      <Space size={[0, 8]} wrap>
        <Tag>기본 태그</Tag>
        <Tag color="success">성공 태그</Tag>
        <Tag color="processing">처리중 태그</Tag>
        <Tag color="error">에러 태그</Tag>
        <Tag color="warning">경고 태그</Tag>
        <Tag color="default">기본 태그</Tag>
        <Tag icon={<SmileOutlined />} color="success">이모지 태그</Tag>
        <Tag icon={<HeartOutlined />} color="error">하트 태그</Tag>
        <Tag icon={<StarOutlined />} color="warning">별 태그</Tag>
        <Tag icon={<FireOutlined />} color="error">불 태그</Tag>
        <Tag icon={<ThunderboltOutlined />} color="warning">번개 태그</Tag>
        <Tag icon={<RocketOutlined />} color="processing">로켓 태그</Tag>
      </Space>
    </div>
  );
};

export default OtherComponentsPage; 