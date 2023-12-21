export type File = {
    id: string
    name: string
    userId: string
    url?: string
    sizeInMegabytes: number
    fileBuffer?: Buffer
    createdAt: Date
    updatedAt: Date
}