import React from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import styles from './FormExamplePage.module.scss';

const { Option } = Select;

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  birthDate: any;
}

const FormExamplePage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log('Form values:', values);
    message.success('폼이 성공적으로 제출되었습니다!');
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Ant Design Form 예시</h1>
        <Form
          form={form}
        name="basic"
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
      >
          <Form.Item
          label="사용자 이름"
          name="username"
          rules={[{ required: true, message: '사용자 이름을 입력해주세요!' }]}
          >
          <Input placeholder="사용자 이름을 입력하세요" />
          </Form.Item>

          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: '이메일을 입력해주세요!' },
            { type: 'email', message: '유효한 이메일 주소를 입력해주세요!' }
            ]}
          >
          <Input placeholder="이메일을 입력하세요" />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
          rules={[
            { required: true, message: '비밀번호를 입력해주세요!' },
            { min: 6, message: '비밀번호는 최소 6자 이상이어야 합니다!' }
          ]}
          >
            <Input.Password placeholder="비밀번호를 입력하세요" />
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
        >
          <Input.Password placeholder="비밀번호를 다시 입력하세요" />
          </Form.Item>

          <Form.Item
          label="역할"
          name="role"
          rules={[{ required: true, message: '역할을 선택해주세요!' }]}
          >
          <Select placeholder="역할을 선택하세요">
            <Option value="user">일반 사용자</Option>
            <Option value="admin">관리자</Option>
            <Option value="editor">편집자</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="생년월일"
          name="birthDate"
          rules={[{ required: true, message: '생년월일을 선택해주세요!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
            제출
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default FormExamplePage; 