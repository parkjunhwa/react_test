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
  message
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import styles from './DataEntryPage.module.scss';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const DataEntryPage: React.FC = () => {
  const [form] = Form.useForm();

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

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('폼이 성공적으로 제출되었습니다!');
  };

  return (
    <div className={styles.container}>
      <Title level={2}>Data Entry 컴포넌트</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="기본 입력" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="텍스트 입력"
                name="text"
                rules={[{ required: true, message: '텍스트를 입력해주세요!' }]}
              >
                <Input placeholder="텍스트를 입력하세요" />
              </Form.Item>

              <Form.Item
                label="숫자 입력"
                name="number"
                rules={[{ required: true, message: '숫자를 입력해주세요!' }]}
              >
                <InputNumber style={{ width: '100%' }} min={1} max={100} />
              </Form.Item>

              <Form.Item
                label="텍스트 영역"
                name="textarea"
              >
                <TextArea rows={4} placeholder="여러 줄의 텍스트를 입력하세요" />
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
              >
                <Input.Password placeholder="비밀번호를 입력하세요" />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="선택 입력" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="단일 선택"
                name="select"
                rules={[{ required: true, message: '항목을 선택해주세요!' }]}
              >
                <Select placeholder="항목을 선택하세요">
                  <Select.Option value="option1">옵션 1</Select.Option>
                  <Select.Option value="option2">옵션 2</Select.Option>
                  <Select.Option value="option3">옵션 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="다중 선택"
                name="multiSelect"
              >
                <Select mode="multiple" placeholder="여러 항목을 선택하세요">
                  <Select.Option value="option1">옵션 1</Select.Option>
                  <Select.Option value="option2">옵션 2</Select.Option>
                  <Select.Option value="option3">옵션 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="날짜 선택"
                name="date"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="날짜 범위"
                name="dateRange"
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="시간 선택"
                name="time"
              >
                <TimePicker style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="체크박스 & 라디오" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="라디오 버튼"
                name="radio"
              >
                <Radio.Group className={styles.radioGroup}>
                  <Radio value="A">옵션 A</Radio>
                  <Radio value="B">옵션 B</Radio>
                  <Radio value="C">옵션 C</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="체크박스"
                name="checkbox"
                valuePropName="checked"
              >
                <Checkbox>체크박스</Checkbox>
              </Form.Item>

              <Form.Item
                name="checkboxGroup"
                label="체크박스 그룹"
                rules={[{ required: true, message: '최소 하나 이상 선택해주세요' }]}
              >
                <Checkbox.Group className={styles.checkboxGroup}>
                  <Checkbox value="A">옵션 A</Checkbox>
                  <Checkbox value="B">옵션 B</Checkbox>
                  <Checkbox value="C">옵션 C</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                label="스위치"
                name="switch"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="슬라이더 & 레이트" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="슬라이더"
                name="slider"
              >
                <Slider
                  marks={{
                    0: '0',
                    25: '25',
                    50: '50',
                    75: '75',
                    100: '100',
                  }}
                />
              </Form.Item>

              <Form.Item
                label="레이트"
                name="rate"
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="파일 업로드"
                name="upload"
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>파일 업로드</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="드래그 앤 드롭 업로드"
                name="dragUpload"
              >
                <Upload.Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">파일을 드래그하거나 클릭하여 업로드하세요</p>
                  <p className="ant-upload-hint">여러 파일을 한 번에 업로드할 수 있습니다.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="동적 폼 필드" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
            >
              <Form.List name="fields">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'first']}
                          rules={[{ required: true, message: '이름을 입력하세요' }]}
                        >
                          <Input placeholder="이름" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          rules={[{ required: true, message: '성을 입력하세요' }]}
                        >
                          <Input placeholder="성" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        필드 추가
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataEntryPage; 