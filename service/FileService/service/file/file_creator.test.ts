import t from 'tap'
import sinon from 'sinon';
import { FileServiceAdapter } from './file';
import { FileLog } from '../../entity/log';
import { File } from '../../entity/file';
import { UploadFile } from './file_creator';

const deps: FileServiceAdapter = {
    InsertFileLog: (_: FileLog) => Promise.resolve(null),
    SaveFileRecord: (_: File) => Promise.resolve(""),
    GetUserTotalQuotaInMegabytesById: (_: string) => Promise.resolve(0),
    GetCurrentQuotaInMegabytes: (_: string) => Promise.resolve(0),
    UploadFile: (_: File) => Promise.resolve(null),
    GetAllFiles: (_: string) => Promise.resolve([]),
    GetFileById: (_: string) => Promise.resolve(null),
    DeleteFileById: (_: string) => Promise.resolve(null),
    GetUserById: (_: string) => Promise.resolve(null),
};

t.test('should call UploadFile with correct user and handle correctly', async () => {
    const GetUserTotalQuotaInMegabytesByIdStub = sinon.stub(deps, 'GetUserTotalQuotaInMegabytesById').resolves(1);
    const GetCurrentQuotaInMegabytesStub = sinon.stub(deps, 'GetCurrentQuotaInMegabytes').resolves(1);
    const UploadFileStub = sinon.stub(deps, 'UploadFile').resolves(null);
    const SaveFileRecordStub = sinon.stub(deps, 'SaveFileRecord').resolves("123");
    const GetFileByIdStub = sinon.stub(deps, 'GetFileById').resolves(null);
    deps.GetUserTotalQuotaInMegabytesById = GetUserTotalQuotaInMegabytesByIdStub;
    deps.GetCurrentQuotaInMegabytes = GetCurrentQuotaInMegabytesStub;
    deps.UploadFile = UploadFileStub;
    deps.SaveFileRecord = SaveFileRecordStub;
    deps.GetFileById = GetFileByIdStub;

    const srv = UploadFile({...deps, 
        GetUserTotalQuotaInMegabytesById: GetUserTotalQuotaInMegabytesByIdStub,
        GetCurrentQuotaInMegabytes: GetCurrentQuotaInMegabytesStub,
        UploadFile: UploadFileStub,
        SaveFileRecord: SaveFileRecordStub,
        GetFileById: GetFileByIdStub,
    });
    const file = {
        createdAt: new Date(),
        fileBuffer: Buffer.from(""),
        id: "123",
        name: "name",
        sizeInMegabytes: 0,
        updatedAt: new Date(),
        url: "",
        userId: "123",
    };
    const result = await srv(file);

    t.equal(result, null, 'UploadFile should return null on success');
    t.equal(UploadFileStub.calledOnce, true);
    t.equal(UploadFileStub.calledWith(file), true);
    UploadFileStub.restore();
    GetFileByIdStub.restore();
    SaveFileRecordStub.restore();
    GetCurrentQuotaInMegabytesStub.restore();
    GetUserTotalQuotaInMegabytesByIdStub.restore();
});
