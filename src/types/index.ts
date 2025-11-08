export interface FileItem {
    name: string;
}
export interface AppState {
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
    files: FileItem[];
    currentFile: {
        name: string | null;
        content: string;
    };
}