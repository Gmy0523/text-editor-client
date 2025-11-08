import React, { useEffect, CSSProperties } from 'react';
import useStore from './store/store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import ErrorAlert from './components/ErrorAlert';

const App: React.FC = () => {
  const { checkConnection } = useStore();

  // 应用加载时检查连接
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.mainContent}>
        <Sidebar />
        <Editor />
      </div>
      <ErrorAlert />
    </div>
  );
};

const styles: {
  app: CSSProperties;
  mainContent: CSSProperties;
} = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
};

export default App;