import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  TimePicker,
  InputNumber,
  Switch,
  Radio,
  Checkbox,

  
  Slider,
  Rate,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Button,
  message,
  Divider,
  AutoComplete,
  Cascader,
  ColorPicker,
  Mentions,
  Transfer,
  TreeSelect,
  Segmented,
  Tooltip,
  Alert,

  Badge
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import dayjs from 'dayjs';
import styles from './DataEntryPage.module.scss';

const { Title, Paragraph } = Typography;
const { TextArea, Password } = Input;
const { RangePicker } = DatePicker;
const { SHOW_PARENT } = TreeSelect;

const DataEntryPage: React.FC = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<{ value: string }[]>([]);
  const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>([]);
  const [conditionalField, setConditionalField] = useState<string>('');
  const [colorValue, setColorValue] = useState('#1890ff');

  // AutoComplete 옵션 생성
  const handleAutoCompleteSearch = (value: string) => {
    const options = !value ? [] : [
      { value: `${value}@gmail.com` },
      { value: `${value}@naver.com` },
      { value: `${value}@daum.net` },
      { value: `${value}@kakao.com` },
    ];
    setAutoCompleteOptions(options);
  };

  // Transfer 데이터
  const transferData = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `항목 ${i + 1}`,
    description: `설명 ${i + 1}`,
  }));

  // Cascader 옵션
  const cascaderOptions = [
    {
      value: 'seoul',
      label: '서울',
      children: [
        {
          value: 'gangnam',
          label: '강남구',
          children: [
            { value: 'apgujeong', label: '압구정동' },
            { value: 'nonhyeon', label: '논현동' },
          ],
        },
        {
          value: 'jongno',
          label: '종로구',
          children: [
            { value: 'myeongdong', label: '명동' },
            { value: 'insadong', label: '인사동' },
          ],
        },
      ],
    },
    {
      value: 'busan',
      label: '부산',
      children: [
        {
          value: 'haeundae',
          label: '해운대구',
          children: [
            { value: 'haeundae-beach', label: '해운대해수욕장' },
            { value: 'centum', label: '센텀시티' },
          ],
        },
      ],
    },
  ];

  // TreeSelect 데이터
  const treeData = [
    {
      title: '기술 스택',
      value: 'tech',
      children: [
        {
          title: '프론트엔드',
          value: 'frontend',
          children: [
            { title: 'React', value: 'react' },
            { title: 'Vue', value: 'vue' },
            { title: 'Angular', value: 'angular' },
          ],
        },
        {
          title: '백엔드',
          value: 'backend',
          children: [
            { title: 'Node.js', value: 'nodejs' },
            { title: 'Python', value: 'python' },
            { title: 'Java', value: 'java' },
          ],
        },
      ],
    },
  ];

  // Upload 설정
  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 파일이 업로드되었습니다.`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 파일 업로드에 실패했습니다.`);
      }
    },
  };

  // Transfer 핸들러
  const handleTransferChange = (newTargetKeys: React.Key[]) => {
    console.log('targetKeys:', newTargetKeys);
    setTransferTargetKeys(newTargetKeys.map(key => String(key)));
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('폼이 성공적으로 제출되었습니다!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('폼 제출에 실패했습니다. 필수 항목을 확인해주세요.');
  };

  // 실시간 유효성 검사
  const checkUsername = async (username: string) => {
    if (!username) return;
    // 시뮬레이션된 API 호출
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin') {
          resolve('이미 사용 중인 사용자명입니다.');
        } else {
          resolve('');
        }
      }, 500);
    });
  };

  return (
    <div className={styles.container}>
      <Title level={2}>종합 Form 컴포넌트 예제</Title>
      <Paragraph>
        Ant Design의 모든 Form 컴포넌트와 고급 기능들을 한 번에 체험해보세요.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {/* 기본 입력 컴포넌트들 */}
        <Col xs={24} lg={12}>
          <Card title="📝 기본 입력 컴포넌트" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <Form.Item
                label={
                  <span>
                    <UserOutlined /> 사용자명
                    <Tooltip title="3-20자의 영문, 숫자 조합">
                      <QuestionCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </span>
                }
                name="username"
                hasFeedback
                rules={[
                  { required: true, message: '사용자명을 입력해주세요!' },
                  { min: 3, max: 20, message: '3-20자 사이로 입력해주세요!' },
                  { pattern: /^[a-zA-Z0-9]+$/, message: '영문, 숫자만 입력 가능합니다!' },
                  {
                    validator: async (_, value) => {
                      if (value) {
                        const error = await checkUsername(value);
                        if (error) {
                          return Promise.reject(new Error(error as string));
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="사용자명을 입력하세요"
                  showCount
                  maxLength={20}
                />
              </Form.Item>

              <Form.Item
                label={<span><MailOutlined /> 이메일</span>}
                name="email"
                rules={[
                  { required: true, message: '이메일을 입력해주세요!' },
                  { type: 'email', message: '올바른 이메일 형식이 아닙니다!' },
                ]}
              >
                <AutoComplete
                  options={autoCompleteOptions}
                  onSearch={handleAutoCompleteSearch}
                  placeholder="이메일을 입력하면 자동완성됩니다"
                >
                  <Input prefix={<MailOutlined />} />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label={<span><PhoneOutlined /> 전화번호</span>}
                name="phone"
                rules={[
                  { required: true, message: '전화번호를 입력해주세요!' },
                  { pattern: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, message: '올바른 전화번호 형식이 아닙니다!' },
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined />} 
                  placeholder="010-1234-5678" 
                  addonBefore="+82"
                />
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                  { required: true, message: '비밀번호를 입력해주세요!' },
                  { min: 8, message: '비밀번호는 최소 8자 이상이어야 합니다!' },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: '대문자, 소문자, 숫자, 특수문자를 포함해야 합니다!',
                  },
                ]}
                hasFeedback
              >
                <Password
                  placeholder="비밀번호를 입력하세요"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  showCount
                />
              </Form.Item>

              <Form.Item
                label="비밀번호 확인"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '비밀번호를 다시 입력해주세요!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Password placeholder="비밀번호를 다시 입력하세요" />
              </Form.Item>

              <Form.Item
                label="나이"
                name="age"
                rules={[
                  { required: true, message: '나이를 입력해주세요!' },
                  { type: 'number', min: 18, max: 100, message: '18-100세 사이로 입력해주세요!' },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={18}
                  max={100}
                  formatter={(value) => `${value}세`}
                  parser={((value: string | undefined) => {
                    const num = Number(value!.replace('세', ''));
                    return num >= 18 && num <= 100 ? num : 18;
                  }) as any}
                />
              </Form.Item>

              <Form.Item
                label="자기소개"
                name="bio"
                rules={[
                  { max: 500, message: '500자 이내로 입력해주세요!' },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="자기소개를 입력하세요 (최대 500자)"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 선택 컴포넌트들 */}
        <Col xs={24} lg={12}>
          <Card title="🎯 선택 컴포넌트" className={styles.card}>
            <Form
              form={form2}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="국가"
                name="country"
                rules={[{ required: true, message: '국가를 선택해주세요!' }]}
              >
                <Select
                  placeholder="국가를 선택하세요"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      ?.indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value="kr">🇰🇷 대한민국</Select.Option>
                  <Select.Option value="us">🇺🇸 미국</Select.Option>
                  <Select.Option value="jp">🇯🇵 일본</Select.Option>
                  <Select.Option value="cn">🇨🇳 중국</Select.Option>
                  <Select.Option value="fr">🇫🇷 프랑스</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="주소 (계층형)"
                name="address"
                rules={[{ required: true, message: '주소를 선택해주세요!' }]}
              >
                <Cascader
                  options={cascaderOptions}
                  placeholder="지역을 선택하세요"
                  showSearch
                  changeOnSelect
                />
              </Form.Item>

              <Form.Item
                label="기술 스택 (다중선택)"
                name="techStack"
                rules={[{ required: true, message: '기술 스택을 선택해주세요!' }]}
              >
                <TreeSelect
                  style={{ width: '100%' }}
                  value={undefined}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="기술 스택을 선택하세요"
                  treeCheckable={true}
                  showCheckedStrategy={SHOW_PARENT}
                  maxTagCount="responsive"
                />
              </Form.Item>

              <Form.Item
                label="관심사"
                name="interests"
                rules={[{ required: true, message: '관심사를 선택해주세요!' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="관심사를 선택하세요"
                  maxTagCount="responsive"
                >
                  <Select.Option value="programming">💻 프로그래밍</Select.Option>
                  <Select.Option value="design">🎨 디자인</Select.Option>
                  <Select.Option value="music">🎵 음악</Select.Option>
                  <Select.Option value="sports">⚽ 스포츠</Select.Option>
                  <Select.Option value="travel">✈️ 여행</Select.Option>
                  <Select.Option value="reading">📚 독서</Select.Option>
                  <Select.Option value="cooking">🍳 요리</Select.Option>
                  <Select.Option value="photography">📷 사진</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="성별"
                name="gender"
                rules={[{ required: true, message: '성별을 선택해주세요!' }]}
              >
                <Radio.Group className={styles.radioGroup}>
                  <Radio value="male">👨 남성</Radio>
                  <Radio value="female">👩 여성</Radio>
                  <Radio value="other">🤖 기타</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="알림 설정"
                name="notifications"
              >
                <Checkbox.Group className={styles.checkboxGroup}>
                  <Checkbox value="email">📧 이메일</Checkbox>
                  <Checkbox value="sms">📱 SMS</Checkbox>
                  <Checkbox value="push">🔔 푸시</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                label="마케팅 수신 동의"
                name="marketing"
                valuePropName="checked"
              >
                <Switch checkedChildren="동의" unCheckedChildren="거부" />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 날짜/시간 컴포넌트들 */}
        <Col xs={24} lg={12}>
          <Card title="📅 날짜/시간 컴포넌트" className={styles.card}>
            <Form
              form={form3}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label={<span><CalendarOutlined /> 생년월일</span>}
                name="birthDate"
                rules={[{ required: true, message: '생년월일을 선택해주세요!' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="생년월일을 선택하세요"
                  disabledDate={(current) => current && current.isAfter(dayjs())}
                />
              </Form.Item>

              <Form.Item
                label="프로젝트 기간"
                name="projectPeriod"
                rules={[{ required: true, message: '프로젝트 기간을 선택해주세요!' }]}
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label={<span><ClockCircleOutlined /> 선호 시간</span>}
                name="preferredTime"
              >
                <TimePicker
                  style={{ width: '100%' }}
                  placeholder="선호하는 시간을 선택하세요"
                  format="HH:mm"
                />
              </Form.Item>

              <Form.Item
                label={<span><StarOutlined /> 평점</span>}
                name="rating"
                rules={[{ required: true, message: '평점을 선택해주세요!' }]}
              >
                <Rate allowHalf character={<HeartOutlined />} />
              </Form.Item>

              <Form.Item
                label="경험 수준 (년)"
                name="experience"
                rules={[{ required: true, message: '경험 수준을 선택해주세요!' }]}
              >
                <Slider
                  marks={{
                    0: '신입',
                    2: '주니어',
                    5: '시니어',
                    10: '리드',
                    15: '전문가',
                  }}
                  max={15}
                  tooltip={{ formatter: (value) => `${value}년` }}
                />
              </Form.Item>

              <Form.Item
                label="테마 색상"
                name="themeColor"
              >
                <ColorPicker
                  value={colorValue}
                  onChange={(color) => setColorValue(color.toHexString())}
                  showText
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 고급 컴포넌트들 */}
        <Col xs={24} lg={12}>
          <Card title="🚀 고급 컴포넌트" className={styles.card}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="언급 (Mentions)"
                name="mentions"
                rules={[{ required: true, message: '멘션을 입력해주세요!' }]}
              >
                <Mentions
                  style={{ width: '100%' }}
                  placeholder="@사용자를 멘션하세요"
                  rows={3}
                >
                  <Mentions.Option value="admin">관리자</Mentions.Option>
                  <Mentions.Option value="user1">사용자1</Mentions.Option>
                  <Mentions.Option value="user2">사용자2</Mentions.Option>
                </Mentions>
              </Form.Item>

              <Form.Item
                label="선택된 권한"
                name="permissions"
              >
                <Transfer
                  dataSource={transferData}
                  targetKeys={transferTargetKeys}
                  onChange={handleTransferChange}
                  render={(item) => item.title}
                  style={{ marginBottom: 16 }}
                />
              </Form.Item>

              <Form.Item
                label="사용자 유형"
                name="userType"
                rules={[{ required: true, message: '사용자 유형을 선택해주세요!' }]}
              >
                <Segmented
                  options={[
                    { label: '👤 개인', value: 'individual' },
                    { label: '🏢 기업', value: 'business' },
                    { label: '🎓 학생', value: 'student' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="조건부 필드"
                name="conditionalType"
              >
                <Select
                  placeholder="옵션을 선택하면 추가 필드가 나타납니다"
                  onChange={setConditionalField}
                >
                  <Select.Option value="personal">개인 정보</Select.Option>
                  <Select.Option value="business">사업자 정보</Select.Option>
                  <Select.Option value="student">학생 정보</Select.Option>
                </Select>
              </Form.Item>

              {conditionalField === 'personal' && (
                <Form.Item
                  label="개인 소개"
                  name="personalIntro"
                  rules={[{ required: true, message: '개인 소개를 입력해주세요!' }]}
                >
                  <TextArea rows={3} placeholder="개인 소개를 입력하세요" />
                </Form.Item>
              )}

              {conditionalField === 'business' && (
                <Form.Item
                  label="사업자 등록번호"
                  name="businessNumber"
                  rules={[
                    { required: true, message: '사업자 등록번호를 입력해주세요!' },
                    { pattern: /^\d{3}-\d{2}-\d{5}$/, message: '올바른 사업자 등록번호 형식이 아닙니다!' },
                  ]}
                >
                  <Input placeholder="000-00-00000" />
                </Form.Item>
              )}

              {conditionalField === 'student' && (
                <Form.Item
                  label="학교명"
                  name="schoolName"
                  rules={[{ required: true, message: '학교명을 입력해주세요!' }]}
                >
                  <Input placeholder="학교명을 입력하세요" />
                </Form.Item>
              )}
            </Form>
          </Card>
        </Col>

        {/* 파일 업로드 */}
        <Col xs={24} lg={12}>
          <Card title="📁 파일 업로드" className={styles.card}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="프로필 이미지"
                name="profileImage"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
              >
                <Upload
                  {...uploadProps}
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>업로드</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                label="첨부 파일"
                name="attachments"
              >
                <Upload {...uploadProps} multiple>
                  <Button icon={<UploadOutlined />}>파일 선택</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="드래그 앤 드롭 업로드"
                name="documents"
              >
                <Upload.Dragger {...uploadProps} multiple>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">파일을 드래그하거나 클릭하여 업로드하세요</p>
                  <p className="ant-upload-hint">
                    여러 파일을 한 번에 업로드할 수 있습니다. PDF, DOC, JPG, PNG 등을 지원합니다.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 동적 폼 필드 */}
        <Col xs={24} lg={12}>
          <Card title="⚡ 동적 폼 필드" className={styles.card}>
            <Alert
              message="동적 필드 예제"
              description="필드를 추가하거나 제거할 수 있습니다."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Form layout="vertical" onFinish={onFinish}>
              <Form.List
                name="contacts"
                rules={[
                  {
                    validator: async (_, contacts) => {
                      if (!contacts || contacts.length < 1) {
                        return Promise.reject(new Error('최소 1개의 연락처를 추가해주세요'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[{ required: true, message: '이름을 입력하세요' }]}
                        >
                          <Input placeholder="이름" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'phone']}
                          rules={[
                            { required: true, message: '전화번호를 입력하세요' },
                            { pattern: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, message: '올바른 전화번호 형식이 아닙니다' },
                          ]}
                        >
                          <Input placeholder="전화번호" prefix={<PhoneOutlined />} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        연락처 추가
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider />

              <Form.List name="skills">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'skill']}
                          rules={[{ required: true, message: '스킬을 입력하세요' }]}
                        >
                          <Input placeholder="스킬명" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'level']}
                          rules={[{ required: true, message: '레벨을 선택하세요' }]}
                        >
                          <Select placeholder="레벨" style={{ width: 120 }}>
                            <Select.Option value="beginner">
                              <Badge status="default" text="초급" />
                            </Select.Option>
                            <Select.Option value="intermediate">
                              <Badge status="processing" text="중급" />
                            </Select.Option>
                            <Select.Option value="advanced">
                              <Badge status="success" text="고급" />
                            </Select.Option>
                            <Select.Option value="expert">
                              <Badge status="error" text="전문가" />
                            </Select.Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        스킬 추가
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </Card>
        </Col>

        {/* 폼 액션 버튼들 */}
        <Col xs={24}>
          <Card title="🎬 폼 액션" className={styles.card}>
            <Space size="large" style={{ width: '100%', justifyContent: 'center' }}>
              <Button type="primary" size="large" onClick={() => form.submit()}>
                📋 기본 정보 제출
              </Button>
              <Button type="primary" size="large" onClick={() => form2.submit()}>
                🎯 선택 정보 제출
              </Button>
              <Button type="primary" size="large" onClick={() => form3.submit()}>
                📅 날짜/시간 정보 제출
              </Button>
              <Button size="large" onClick={() => {
                form.resetFields();
                form2.resetFields();
                form3.resetFields();
                message.info('모든 폼이 초기화되었습니다.');
              }}>
                🔄 전체 초기화
              </Button>
              <Button size="large" onClick={() => {
                const values1 = form.getFieldsValue();
                const values2 = form2.getFieldsValue();
                const values3 = form3.getFieldsValue();
                console.log('모든 폼 값:', { ...values1, ...values2, ...values3 });
                message.info('콘솔에서 모든 폼 값을 확인하세요.');
              }}>
                👁️ 전체 값 보기
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataEntryPage; 