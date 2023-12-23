type FileDeps = {
  insertObject(key: string, data: Buffer): Promise<void>;
  removeObject(key: string): Promise<void>;
};
