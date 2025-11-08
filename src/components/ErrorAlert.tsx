import React, { CSSProperties } from 'react';
import useStore from '../store/store';

const ErrorAlert: React.FC = () => {
    const { error, clearError } = useStore();

    if (!error) return null;

    return (
        <div style={styles.errorContainer}>
            <p style={styles.errorMessage}>{error}</p>
            <button
                onClick={clearError}
                style={styles.closeButton}
            >
                ×
            </button>
        </div>
    );
};

const styles: {
    errorContainer: CSSProperties;
    errorMessage: CSSProperties;
    closeButton: CSSProperties;
} = {
    errorContainer: {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '1rem',
        border: '1px solid #f5c6cb',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    errorMessage: {
        margin: 0,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#721c24',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '0 0.5rem',
    },
};

export default ErrorAlert;