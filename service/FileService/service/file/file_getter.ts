import { File } from "../../entity/file";
import { FileServiceAdapter } from "./file";

export function GetAllFiles(deps: FileServiceAdapter) {
    return async function (userId: string): Promise<File[]> {
        return deps.GetAllFiles(userId);
    }
}