import { FileLog } from "../../entity/log";
import { FileServiceAdapter } from "./file";

export function DeleteFileById(deps: FileServiceAdapter) {
    return async function (fileId: string): Promise<Error | null> {
        const file = await deps.GetFileById(fileId)
        if (file == null) {
            return new Error("file not found")
        }
        const fileLog : FileLog = {
            createdAt: new Date(),
            fileName: file.name,
            userId: file.userId,
            action: "delete",
            status: "",
            fileId:fileId
        }

        let err = await deps.DeleteFileById(fileId)
        if (err instanceof Error){
            deps.InsertFileLog({...fileLog, 
                status: 'failure',
                errorMsg: err.message
            })
            return new Error("internal server error")
        }
        deps.InsertFileLog({...fileLog, 
            status: 'success',
        })
        return null
    }
}