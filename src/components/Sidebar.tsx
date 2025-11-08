import React, { useState, CSSProperties } from 'react';
import useStore from '../store/store';

interface FileItem {
    name: string;
}

const Sidebar: React.FC = () => {
    const {
        files,
        isConnected,
        isLoading,
        currentFile,
        openFile,
        deleteSelectedFile,
        createNewFile
    } = useStore();

    const [newFileName, setNewFileName] = useState('');

    const handleCreateFile = () => {
        if (!newFileName.trim()) return;

        // 确保文件名以.txt结尾
        const filename = newFileName.endsWith('.txt')
            ? newFileName
            : `${newFileName}.txt`;

        createNewFile(filename);
        setNewFileName('');
    };

    const handleDeleteFile = (filename: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(`确定要删除 ${filename} 吗？`)) {
            deleteSelectedFile(filename);
        }
    };

    if (!isConnected) {
        return (
            <div style={styles.sidebar}>
                <p>请启动本地服务并重试</p>
            </div>
        );
    }

    return (
        <div style={styles.sidebar}>
            <div style={styles.newFileContainer}>
                <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="输入文件名"
                    style={styles.filenameInput}
                    disabled={isLoading}
                />
                <button
                    onClick={handleCreateFile}
                    style={styles.createButton}
                    disabled={isLoading || !newFileName.trim()}
                >
                    新建文件
                </button>
            </div>

            <div style={styles.filesList}>
                {isLoading && files.length === 0 ? (
                    <p>加载文件中...</p>
                ) : files.length === 0 ? (
                    <p>没有文件</p>
                ) : (
                    files.map((file: FileItem) => (
                        <div
                            key={file.name}
                            style={{
                                ...styles.fileItem,
                                backgroundColor: currentFile.name === file.name ? '#e9ecef' : 'transparent',
                            }}
                            onClick={() => openFile(file.name)}
                        >
                            <span>{file.name}</span>
                            <button
                                onClick={(e) => handleDeleteFile(file.name, e)}
                                style={styles.deleteButton}
                                disabled={isLoading}
                            >
                                删除
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles: {
    sidebar: CSSProperties;
    newFileContainer: CSSProperties;
    filenameInput: CSSProperties;
    createButton: CSSProperties;
    filesList: CSSProperties;
    fileItem: CSSProperties;
    deleteButton: CSSProperties;
} = {
    sidebar: {
        width: '250px',
        borderRight: '1px solid #ddd',
        padding: '1rem',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        backgroundColor: '#f8f9fa',
    },
    newFileContainer: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
    },
    filenameInput: {
        flex: 1,
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    createButton: {
        padding: '0.5rem',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    filesList: {
        marginTop: '1rem',
    },
    fileItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '0.2rem 0.4rem',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8rem',
    },
};

export default Sidebar;