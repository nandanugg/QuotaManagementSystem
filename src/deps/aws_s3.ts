import AWS from "aws-sdk";

class AwsS3Client {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  async insertObject(
    bucketName: string,
    key: string,
    data: Buffer,
  ): Promise<void> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: key,
      Body: data,
    };

    await this.s3.putObject(params).promise();
  }

  async removeObject(bucketName: string, key: string): Promise<void> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}

export default AwsS3Client;
