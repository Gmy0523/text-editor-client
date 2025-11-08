const LOCAL_SERVICE_URL = 'https://localhost:9527';

// 健康检查
export const checkHealth = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${LOCAL_SERVICE_URL}/health`);
        return response.ok;
    } catch (error) {
        return false;
    }
};

// 获取文件列表
export const getFilesList = async (): Promise<string[]> => {
    const response = await fetch(`${LOCAL_SERVICE_URL}/files`);

    if (!response.ok) {
        throw new Error('获取文件列表失败');
    }

    const data = await response.json();
    return data.files;
};

// 读取文件内容
export const readFileContent = async (filename: string): Promise<string> => {
    const response = await fetch(`${LOCAL_SERVICE_URL}/files/${filename}`);

    if (!response.ok) {
        throw new Error(`读取文件 ${filename} 失败`);
    }

    return response.text();
};

// 创建新文件
export const createFile = async (filename: string, content: string = ''): Promise<void> => {
    const response = await fetch(`${LOCAL_SERVICE_URL}/files`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename, content }),
    });

    if (!response.ok) {
        throw new Error(`创建文件 ${filename} 失败`);
    }
};

// 更新文件内容
export const updateFile = async (filename: string, content: string): Promise<void> => {
    const response = await fetch(`${LOCAL_SERVICE_URL}/files/${filename}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error(`保存文件 ${filename} 失败`);
    }
};

// 删除文件
export const deleteFile = async (filename: string): Promise<void> => {
    const response = await fetch(`${LOCAL_SERVICE_URL}/files/${filename}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`删除文件 ${filename} 失败`);
    }
};