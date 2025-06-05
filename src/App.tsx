import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import koKR from 'antd/locale/ko_KR';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import FormExamplePage from './pages/FormExamplePage';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/form-example" element={<FormExamplePage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
