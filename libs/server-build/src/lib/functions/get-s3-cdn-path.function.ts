export function getS3CdnPath(bucket: string, region: string, key: string) {
    return `https://s3.${region}.amazonaws.com/${bucket}/${key}`;
}