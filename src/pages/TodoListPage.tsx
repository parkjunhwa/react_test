import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  List,
  Checkbox,
  Typography,
  Space,
  Tag,
  Popconfirm,
  message,
  Empty,
  Row,
  Col,
  Statistic,
  Progress,
  Select,
  DatePicker,
  Modal,
  Form,
  Divider,
  Badge,
  Tooltip,
  Switch
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  FilterOutlined,
  ClearOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './TodoListPage.module.scss';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
}

const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'dueDate' | 'priority'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedDueDate, setSelectedDueDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [form] = Form.useForm();

  // 로컬 스토리지에서 할 일 목록 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 할 일 목록이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 필터링 및 정렬 적용
  useEffect(() => {
    let filtered = todos;

    // 상태별 필터링
    if (filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // 우선순위별 필터링
    if (filterPriority !== 'all') {
      filtered = filtered.filter(todo => todo.priority === filterPriority);
    }

    // 검색어 필터링
    if (searchText) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // 완료된 항목 숨기기 옵션
    if (!showCompleted) {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // 정렬
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredTodos(filtered);
  }, [todos, filterStatus, filterPriority, searchText, sortBy, sortOrder, showCompleted]);

  // 새 할 일 추가
  const addTodo = () => {
    if (!inputValue.trim()) {
      message.warning('할 일을 입력해주세요!');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title: inputValue.trim(),
      description: descriptionValue.trim() || undefined,
      completed: false,
      priority: selectedPriority,
      dueDate: selectedDueDate?.format('YYYY-MM-DD'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: selectedCategory || undefined
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
    setDescriptionValue('');
    setSelectedPriority('medium');
    setSelectedDueDate(null);
    setSelectedCategory('');
    message.success('할 일이 추가되었습니다!');
  };

  // 할 일 완료/미완료 토글
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  // 할 일 삭제
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    message.success('할 일이 삭제되었습니다!');
  };

  // 편집 모드 시작
  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  // 편집 저장
  const saveEdit = (id: string) => {
    if (!editTitle.trim()) {
      message.warning('할 일을 입력해주세요!');
      return;
    }

    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            title: editTitle.trim(),
            description: editDescription.trim() || undefined,
            updatedAt: new Date().toISOString()
          }
        : todo
    ));
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    message.success('할 일이 수정되었습니다!');
  };

  // 편집 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  // 모든 할 일 완료/미완료 토글
  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
      updatedAt: new Date().toISOString()
    })));
  };

  // 완료된 할 일 모두 삭제
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    message.success('완료된 할 일이 모두 삭제되었습니다!');
  };

  // 통계 계산
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // 우선순위별 색상
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  // 우선순위별 텍스트
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '보통';
    }
  };

  // 마감일 상태 확인
  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return null;
    
    const today = dayjs();
    const due = dayjs(dueDate);
    const diffDays = due.diff(today, 'day');

    if (diffDays < 0) return { status: 'overdue', text: '기한 초과', color: 'red' };
    if (diffDays === 0) return { status: 'today', text: '오늘 마감', color: 'orange' };
    if (diffDays <= 3) return { status: 'soon', text: '곧 마감', color: 'yellow' };
    return { status: 'normal', text: '여유', color: 'green' };
  };

  return (
    <div className={styles.container}>
      <Title level={2}>📝 할 일 목록</Title>
      <Paragraph>
        효율적으로 할 일을 관리하고 진행 상황을 추적해보세요.
      </Paragraph>

      {/* 통계 카드 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="전체 할 일"
              value={totalTodos}
              prefix={<CheckOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="완료된 할 일"
              value={completedTodos}
              prefix={<CheckOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="대기 중인 할 일"
              value={pendingTodos}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="완료율"
              value={completionRate}
              suffix="%"
              prefix={<StarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 진행률 */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Text strong>전체 진행률</Text>
        </div>
        <Progress
          percent={completionRate}
          status={completionRate === 100 ? 'success' : 'active'}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
      </Card>

      {/* 필터 및 검색 */}
      <Card title="필터 및 검색" style={{ marginBottom: 24 }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Select
              placeholder="상태별 필터"
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: '100%' }}
            >
              <Option value="all">전체</Option>
              <Option value="pending">대기 중</Option>
              <Option value="completed">완료</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="우선순위별 필터"
              value={filterPriority}
              onChange={setFilterPriority}
              style={{ width: '100%' }}
            >
              <Option value="all">전체</Option>
              <Option value="high">높음</Option>
              <Option value="medium">보통</Option>
              <Option value="low">낮음</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="정렬 기준"
              value={sortBy}
              onChange={setSortBy}
              style={{ width: '100%' }}
            >
              <Option value="createdAt">생성일</Option>
              <Option value="dueDate">마감일</Option>
              <Option value="priority">우선순위</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Button
              icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{ width: '100%' }}
            >
              {sortOrder === 'asc' ? '오름차순' : '내림차순'}
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={18}>
            <Search
              placeholder="할 일 검색..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Space>
              <Switch
                checked={showCompleted}
                onChange={setShowCompleted}
                checkedChildren="완료 표시"
                unCheckedChildren="완료 숨김"
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 새 할 일 추가 */}
      <Card title="새 할 일 추가" style={{ marginBottom: 24 }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Input
              placeholder="할 일을 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={addTodo}
              size="large"
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="우선순위"
              value={selectedPriority}
              onChange={setSelectedPriority}
              style={{ width: '100%' }}
            >
              <Option value="low">낮음</Option>
              <Option value="medium">보통</Option>
              <Option value="high">높음</Option>
            </Select>
          </Col>
          <Col span={4}>
            <DatePicker
              placeholder="마감일"
              value={selectedDueDate}
              onChange={setSelectedDueDate}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addTodo}
              size="large"
              style={{ width: '100%' }}
            >
              추가
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={20}>
            <Input.TextArea
              placeholder="상세 설명 (선택사항)"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              rows={2}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="카테고리"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </Col>
        </Row>
      </Card>

      {/* 액션 버튼 */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Button
            icon={<CheckOutlined />}
            onClick={toggleAllTodos}
            disabled={todos.length === 0}
          >
            {todos.every(todo => todo.completed) ? '모두 미완료' : '모두 완료'}
          </Button>
          <Popconfirm
            title="완료된 할 일을 모두 삭제하시겠습니까?"
            onConfirm={clearCompleted}
            okText="삭제"
            cancelText="취소"
          >
            <Button
              icon={<ClearOutlined />}
              danger
              disabled={completedTodos === 0}
            >
              완료된 항목 삭제
            </Button>
          </Popconfirm>
        </Space>
      </Card>

      {/* 할 일 목록 */}
      <Card title={`할 일 목록 (${filteredTodos.length}개)`}>
        {filteredTodos.length === 0 ? (
          <Empty
            description="할 일이 없습니다"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            dataSource={filteredTodos}
            renderItem={(todo) => (
              <List.Item
                key={todo.id}
                className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
                actions={[
                  <Tooltip title="완료/미완료">
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                  </Tooltip>,
                  <Tooltip title="수정">
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => startEditing(todo)}
                      disabled={editingId === todo.id}
                    />
                  </Tooltip>,
                  <Popconfirm
                    title="이 할 일을 삭제하시겠습니까?"
                    onConfirm={() => deleteTodo(todo.id)}
                    okText="삭제"
                    cancelText="취소"
                  >
                    <Tooltip title="삭제">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                      />
                    </Tooltip>
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  title={
                    editingId === todo.id ? (
                      <div>
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onPressEnter={() => saveEdit(todo.id)}
                          style={{ marginBottom: 8 }}
                        />
                        <Input.TextArea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={2}
                          style={{ marginBottom: 8 }}
                        />
                        <Space>
                          <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={() => saveEdit(todo.id)}
                            size="small"
                          >
                            저장
                          </Button>
                          <Button
                            icon={<CloseOutlined />}
                            onClick={cancelEdit}
                            size="small"
                          >
                            취소
                          </Button>
                        </Space>
                      </div>
                    ) : (
                      <div className={styles.todoTitle}>
                        <Text
                          delete={todo.completed}
                          style={{
                            color: todo.completed ? '#999' : '#000',
                            fontSize: '16px',
                            fontWeight: 500
                          }}
                        >
                          {todo.title}
                        </Text>
                        {todo.description && (
                          <Paragraph
                            type="secondary"
                            style={{ margin: '8px 0 0 0' }}
                          >
                            {todo.description}
                          </Paragraph>
                        )}
                      </div>
                    )
                  }
                  description={
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <Space wrap>
                        <Tag color={getPriorityColor(todo.priority)}>
                          {getPriorityText(todo.priority)}
                        </Tag>
                        {todo.category && (
                          <Tag color="blue">{todo.category}</Tag>
                        )}
                        {todo.dueDate && (
                          <Tag
                            color={getDueDateStatus(todo.dueDate)?.color}
                            icon={<CalendarOutlined />}
                          >
                            {getDueDateStatus(todo.dueDate)?.text}: {dayjs(todo.dueDate).format('YYYY-MM-DD')}
                          </Tag>
                        )}
                      </Space>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        생성일: {dayjs(todo.createdAt).format('YYYY-MM-DD HH:mm')}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default TodoListPage; 