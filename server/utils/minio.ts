import { Client } from "minio";

let minioClient: Client | null = null;

export const getMinioClient = (): Client => {
  if (minioClient) return minioClient;

  const endpoint = process.env.NUXT_MINIO_ENDPOINT || "localhost:9000";
  const accessKey: string = process.env.NUXT_MINIO_USER || "minio";
  const secretKey: string = process.env.NUXT_MINIO_PASSWORD || "changeme321";
  const useSSL = process.env.NUXT_MINIO_USE_SSL === "true";

  const [host, portStr]: [string, string] = endpoint.split(":") as [
    string,
    string,
  ];
  const port: number = useSSL ? 443 : parseInt(portStr || "9000");

  minioClient = new Client({
    endPoint: host,
    port,
    useSSL,
    accessKey,
    secretKey,
  });

  return minioClient;
};

export const MINIO_BUCKET = process.env.NUXT_MINIO_BUCKET || "myblog";

export const getMinioUrl = (objectName: string): string => {
  const baseUrl = process.env.NUXT_MINIO_PUBLIC_URL || "http://localhost:9000";
  return `${baseUrl}/${MINIO_BUCKET}/${objectName}`;
};

export const uploadToMinio = async (
  buffer: Buffer,
  objectName: string,
  contentType: string,
): Promise<string> => {
  const client = getMinioClient();
  const bucket = MINIO_BUCKET;

  const exists = await client.bucketExists(bucket);
  if (!exists) {
    await client.makeBucket(bucket);
  }

  await client.putObject(bucket, objectName, buffer, buffer.length, {
    "Content-Type": contentType,
  });

  return getMinioUrl(objectName);
};

export const deleteFromMinio = async (objectName: string) => {
  const client = getMinioClient();
  await client.removeObject(MINIO_BUCKET, objectName);
};
