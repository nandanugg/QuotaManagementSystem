import { File } from "../../entity/file";
import { FileLog } from "../../entity/log";
import { User } from "../../entity/user";
import { UploadFile } from "./file_creator";
import { DeleteFileById } from "./file_deleter";
import { GetAllFiles } from "./file_getter";

export type FileServiceAdapter = {
  InsertFileLog: (file: FileLog) => Promise<Error | null>;
  InsertFileRecord: (file: File) => Promise<Error | string>;
  DeleteFileRecord: (fileId: string) => Promise<Error | null>;
  GetUserTotalQuotaInMegabytesById: (usrId: string) => Promise<number>;
  GetCurrentQuotaInMegabytes: (usrId: string) => Promise<number>;
  UploadFile: (file: File) => Promise<Error | null>;
  GetAllFiles: (userId: string) => Promise<File[]>;
  GetFileById: (fileId: string) => Promise<File | null>;
  DeleteFileById: (fileId: string) => Promise<Error | null>;
  GetUserById: (usrId: string) => Promise<User | null>;
};

type FileService = {
  GetAllFiles: (userId: string) => Promise<File[]>;
  UploadFile: (file: File) => Promise<Error | null>;
  DeleteFileById: (fileId: string) => Promise<Error | null>;
};

export function UserService(deps: FileServiceAdapter): FileService {
  return {
    UploadFile: UploadFile(deps),
    GetAllFiles: GetAllFiles(deps),
    DeleteFileById: DeleteFileById(deps),
  };
}
