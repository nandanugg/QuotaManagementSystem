export type FileLog = {
  userId: string;
  fileId?: string;
  errorMsg?: string;
  fileName: string;
  action: string; // 'upload' | 'delete'
  status: string; // 'success' | 'failure' |
  createdAt: Date;
};
