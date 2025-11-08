import { create } from 'zustand';
import { AppState } from '../types';
import {
    checkHealth,
    getFilesList,
    readFileContent,
    createFile,
    updateFile,
    deleteFile
} from '../services/api';

type Store = AppState & {
    checkConnection: () => Promise<void>;
    fetchFiles: () => Promise<void>;
    openFile: (filename: string) => Promise<void>;
    createNewFile: (filename: string) => Promise<void>;
    saveCurrentFile: () => Promise<void>;
    deleteSelectedFile: (filename: string) => Promise<void>;
    setCurrentFileContent: (content: string) => void;
    clearError: () => void;
};

const useStore = create<Store>((set, get) => ({
    // 初始状态
    isConnected: false,
    isLoading: false,
    error: null,
    files: [],
    currentFile: {
        name: null,
        content: '',
    },

    // 检查服务连接
    checkConnection: async () => {
        set({ isLoading: true, error: null });
        try {
            const isAlive = await checkHealth();
            set({ isConnected: isAlive, isLoading: false });

            if (isAlive) {
                get().fetchFiles();
            }
        } catch (error) {
            set({
                isConnected: false,
                isLoading: false,
                error: error instanceof Error ? error.message : '检查连接失败'
            });
        }
    },

    // 获取文件列表
    fetchFiles: async () => {
        set({ isLoading: true, error: null });
        try {
            const files = await getFilesList();
            set({
                files: files.map(name => ({ name })),
                isLoading: false
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : '获取文件列表失败'
            });
        }
    },

    // 打开文件
    openFile: async (filename: string) => {
        set({ isLoading: true, error: null });
        try {
            const content = await readFileContent(filename);
            set({
                currentFile: { name: filename, content },
                isLoading: false
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : `打开文件 ${filename} 失败`
            });
        }
    },

    // 创建新文件
    createNewFile: async (filename: string) => {
        set({ isLoading: true, error: null });
        try {
            await createFile(filename);
            await get().fetchFiles();
            set({ isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : `创建文件 ${filename} 失败`
            });
        }
    },

    // 保存当前文件
    saveCurrentFile: async () => {
        const { currentFile } = get();
        if (!currentFile.name) return;

        set({ isLoading: true, error: null });
        try {
            await updateFile(currentFile.name, currentFile.content);
            set({ isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : `保存文件 ${currentFile.name} 失败`
            });
        }
    },

    // 删除文件
    deleteSelectedFile: async (filename: string) => {
        set({ isLoading: true, error: null });
        try {
            await deleteFile(filename);

            // 如果删除的是当前打开的文件，清空编辑器
            const { currentFile } = get();
            if (currentFile.name === filename) {
                set({ currentFile: { name: null, content: '' } });
            }

            await get().fetchFiles();
            set({ isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : `删除文件 ${filename} 失败`
            });
        }
    },

    // 更新当前文件内容
    setCurrentFileContent: (content: string) => {
        set((state: AppState) => ({
            currentFile: {
                ...state.currentFile,
                content
            }
        }));
    },

    // 清除错误信息
    clearError: () => {
        set({ error: null });
    }
}));

export default useStore;