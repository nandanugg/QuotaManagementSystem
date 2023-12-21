import { Pool } from "postgresql-client";
import { FileLog } from "../entity/log";
import { File } from "../entity/file";

type DbAdapter = {
  InsertFileLog: (file: FileLog) => Promise<Error | null>;
  SaveFileRecord: (file: File) => Promise<Error | string>;
  GetCurrentQuotaInMegabytes: (usrId: string) => Promise<number>;
};

export function NewDbAdapter(db: Pool): DbAdapter {
  return {
    InsertFileLog: InsertFileLog(db),
    SaveFileRecord: SaveFileRecord(db),
    GetCurrentQuotaInMegabytes: GetCurrentQuotaInMegabytes(db),
  };
}

function InsertFileLog(pool: Pool) {
  return function (file: FileLog): Promise<Error | null> {
    return pool
      .query(
        "INSERT INTO file_log (created_at, file_name, user_id, action, status, file_id, error_msg) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        {
          params: [
            file.createdAt,
            file.fileName,
            file.userId,
            file.action,
            file.status,
            file.fileId,
            file.errorMsg,
          ],
        }
      )
      .then(() => null)
      .catch((err) => err);
  };
}

function SaveFileRecord(pool: Pool) {
  return function (file: File): Promise<Error | string> {
    return pool
      .query(
        "INSERT INTO file (created_at, updated_at, name, size_in_megabytes, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        {
          params: [
            file.createdAt,
            file.updatedAt,
            file.name,
            file.sizeInMegabytes,
            file.userId,
          ],
        }
      )
      .then(async (res) => {
        const cursor = res.cursor;
        if (cursor === undefined) {
          return new Error("cursor is undefined");
        }
        let row;
        let result;
        while ((row = await cursor.next())) {
          result = row.id;
        }
        await cursor.close();

        return result;
      })
      .catch((err) => err);
  };
}

function GetCurrentQuotaInMegabytes(pool: Pool) {
  return function (usrId: string): Promise<number> {
    return pool
      .query("SELECT SUM(size_in_megabytes) as total FROM file WHERE user_id = $1", {
        params: [usrId],
      })
      .then(async (res) => {
        const cursor = res.cursor;
        if (cursor === undefined) {
          return new Error("cursor is undefined");
        }
        let row;
        let result;
        while ((row = await cursor.next())) {
          result = row.total;
        }
        await cursor.close();

        return result;
      })
      .catch((_) => 0);
  };
}
