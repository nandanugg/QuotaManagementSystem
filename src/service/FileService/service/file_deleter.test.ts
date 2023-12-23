import t from "tap";
import sinon from "sinon";
import { FileServiceAdapter } from "./file";
import { FileLog } from "../entity/log";
import { File } from "../entity/file";
import { DeleteFileById } from "./file_deleter";

const deps: FileServiceAdapter = {
  InsertFileLog: (_: FileLog) => Promise.resolve(null),
  InsertFileRecord: (_: File) => Promise.resolve(""),
  DeleteFileRecord: (_: string) => Promise.resolve(null),
  GetUserTotalQuotaInMegabytesById: (_: string) => Promise.resolve(0),
  GetCurrentQuotaInMegabytes: (_: string) => Promise.resolve(0),
  UploadFile: (_: File) => Promise.resolve(null),
  GetAllFiles: (_: string) => Promise.resolve([]),
  GetFileById: (_: string) => Promise.resolve(null),
  DeleteFileById: (_: string) => Promise.resolve(null),
  GetUserById: (_: string) => Promise.resolve(null),
};

t.test(
  "should call DeleteFileById with correct user and handle correctly",
  async () => {
    const DeleteFileByIdStub = sinon
      .stub(deps, "DeleteFileById")
      .resolves(null);
    const GetFileByIdStub = sinon.stub(deps, "GetFileById").resolves({
      createdAt: new Date(),
      fileBuffer: Buffer.from(""),
      id: "123",
      name: "name",
      sizeInMegabytes: 0,
      updatedAt: new Date(),
      url: "",
      userId: "123",
    });
    const DeleteFileRecordStub = sinon
      .stub(deps, "DeleteFileRecord")
      .resolves(null);
    deps.DeleteFileById = DeleteFileByIdStub;
    deps.GetFileById = GetFileByIdStub;
    deps.DeleteFileRecord = DeleteFileRecordStub;

    const srv = DeleteFileById({
      ...deps,
      DeleteFileById: DeleteFileByIdStub,
      GetFileById: GetFileByIdStub,
    });
    const result = await srv("123");

    t.equal(result, null, "DeleteFileById should return null on success");
    t.equal(DeleteFileByIdStub.calledOnce, true);
    t.equal(DeleteFileByIdStub.calledWith("123"), true);
    DeleteFileByIdStub.restore();
    GetFileByIdStub.restore();
  },
);
