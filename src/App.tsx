import React from 'react';
import { ConfigProvider } from 'antd';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import koKR from 'antd/locale/ko_KR';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import DataEntryPage from './pages/DataEntryPage';
import FormExamplePage from './pages/FormExamplePage';
import DataDisplayPage from './pages/DataDisplayPage';
import FeedbackPage from './pages/FeedbackPage';
import NavigationPage from './pages/NavigationPage';
import OtherComponentsPage from './pages/OtherComponentsPage';
import SamplePage from './pages/SamplePage';
import TodoListPage from './pages/TodoListPage';
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
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="data-entry" element={<DataEntryPage />} />
            <Route path="form-example" element={<FormExamplePage />} />
            <Route path="data-display" element={<DataDisplayPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="navigation" element={<NavigationPage />} />
            <Route path="other" element={<OtherComponentsPage />} />
            <Route path="sample" element={<SamplePage />} />
            <Route path="todo" element={<TodoListPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
