import React, { CSSProperties } from 'react';
import useStore from '../store/store';

const Editor: React.FC = () => {
    const {
        currentFile,
        isConnected,
        isLoading,
        setCurrentFileContent,
        saveCurrentFile
    } = useStore();

    if (!isConnected) {
        return (
            <div style={styles.editorContainer}>
                <p>请启动本地服务以编辑文件</p>
            </div>
        );
    }

    if (!currentFile.name) {
        return (
            <div style={styles.editorContainer}>
                <p>请从侧边栏选择一个文件进行编辑</p>
            </div>
        );
    }

    return (
        <div style={styles.editorContainer}>
            <div style={styles.editorHeader}>
                <h3>{currentFile.name}</h3>
                <button
                    onClick={saveCurrentFile}
                    style={styles.saveButton}
                    disabled={isLoading}
                >
                    {isLoading ? '保存中...' : '保存'}
                </button>
            </div>
            <textarea
                value={currentFile.content}
                onChange={(e) => setCurrentFileContent(e.target.value)}
                style={styles.textarea}
                disabled={isLoading}
                placeholder="文件内容..."
            />
        </div>
    );
};

const styles: {
    editorContainer: CSSProperties;
    editorHeader: CSSProperties;
    saveButton: CSSProperties;
    textarea: CSSProperties;
} = {
    editorContainer: {
        flex: 1,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    editorHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    saveButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    textarea: {
        flex: 1,
        width: '100%',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        resize: 'none',
        fontSize: '1rem',
        fontFamily: 'monospace',
    },
};

export default Editor;