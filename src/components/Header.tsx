import React, { CSSProperties } from 'react';
import useStore from '../store/store';

const Header: React.FC = () => {
    const { isConnected, isLoading, checkConnection } = useStore();

    return (
        <header style={styles.header}>
            <h1>文本编辑器</h1>
            <div style={styles.statusContainer}>
                <span
                    style={{
                        ...styles.statusIndicator,
                        backgroundColor: isConnected ? 'green' : 'red'
                    }}
                />
                <span>
                    {isLoading ? '检查连接中...' : isConnected ? '服务已连接' : '服务未连接'}
                </span>
                {!isConnected && (
                    <button
                        style={styles.retryButton}
                        onClick={() => checkConnection()}
                        disabled={isLoading}
                    >
                        重试
                    </button>
                )}
            </div>
        </header>
    );
};

const styles: {
    header: CSSProperties;
    statusContainer: CSSProperties;
    statusIndicator: CSSProperties;
    retryButton: CSSProperties;
} = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    statusIndicator: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
    },
    retryButton: {
        padding: '0.3rem 0.6rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Header;