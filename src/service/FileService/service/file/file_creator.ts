import { File } from "../../entity/file";
import { FileLog } from "../../entity/log";
import { FileServiceAdapter } from "./file";

export function UploadFile(deps: FileServiceAdapter) {
  return async function (file: File): Promise<Error | null> {
    const usrQuota = await deps.GetUserTotalQuotaInMegabytesById(file.userId);
    const currentQuota = await deps.GetCurrentQuotaInMegabytes(file.userId);

    if (usrQuota > currentQuota) {
      return new Error("quota exceeded");
    }

    const fileLog: FileLog = {
      createdAt: new Date(),
      fileName: file.name,
      userId: file.userId,
      action: "upload",
      status: "",
    };

    let err = await deps.UploadFile(file);
    if (err instanceof Error) {
      // no need to wait for this to finish
      deps.InsertFileLog({
        ...fileLog,
        status: "failure",
        errorMsg: err.message,
      });
      return new Error("internal server error");
    }

    const fileId = await deps.InsertFileRecord(file);
    if (fileId instanceof Error) {
      // no need to wait for this to finish
      deps.InsertFileLog({
        ...fileLog,
        status: "failure",
        errorMsg: fileId.message,
      });
      return new Error("internal server error");
    }

    deps.InsertFileLog({ ...fileLog, status: "success", fileId: fileId });
    return null;
  };
}
