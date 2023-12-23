import t from "tap";
import sinon from "sinon";
import { FileServiceAdapter } from "./file";
import { FileLog } from "../entity/log";
import { File } from "../entity/file";
import { GetAllFiles } from "./file_getter";

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
  "should call GetAllFiles with correct user and handle success",
  async () => {
    const payload = [
      {
        createdAt: new Date(),
        fileBuffer: Buffer.from(""),
        id: "123",
        name: "name",
        sizeInMegabytes: 0,
        updatedAt: new Date(),
        url: "",
        userId: "123",
      },
    ];

    const GetAllFilesStub = sinon.stub(deps, "GetAllFiles").resolves(payload);
    deps.GetAllFiles = GetAllFilesStub;

    const srv = GetAllFiles({ ...deps, GetAllFiles: GetAllFilesStub });
    const result = await srv("123");

    t.equal(GetAllFilesStub.calledOnce, true);
    t.equal(GetAllFilesStub.calledWith("123"), true);
    t.equal(result, payload, "GetAllFiles should return null on success");
    GetAllFilesStub.restore();
  },
);
