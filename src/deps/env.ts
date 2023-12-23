export type Config = {
  PORT: number;
  DB_URL: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_S3_BUCKET: string;
  AWS_S3_ENDPOINT: string;
  AWS_S3_BASE_URL: string;
};

export function getConfigFromEnv(): Config {
  return {
    PORT: parseInt(process.env["PORT"] || "3000"),
    DB_URL: process.env["DB_URL"] || "",
    DB_NAME: process.env["DB_NAME"] || "",
    DB_USER: process.env["DB_USER"] || "",
    DB_PASSWORD: process.env["DB_PASSWORD"] || "",
    DB_HOST: process.env["DB_HOST"] || "",
    AWS_ACCESS_KEY_ID: process.env["AWS_ACCESS_KEY_ID"] || "",
    AWS_SECRET_ACCESS_KEY: process.env["AWS_SECRET_ACCESS_KEY"] || "",
    AWS_REGION: process.env["AWS_REGION"] || "",
    AWS_S3_BUCKET: process.env["AWS_S3_BUCKET"] || "",
    AWS_S3_ENDPOINT: process.env["AWS_S3_ENDPOINT"] || "",
    AWS_S3_BASE_URL: process.env["AWS_S3_BASE_URL"] || "",
  };
}
