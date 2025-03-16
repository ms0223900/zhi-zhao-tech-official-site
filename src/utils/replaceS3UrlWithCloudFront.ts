
/**
 * 將 S3 Bucket URL 替換為 CloudFront URL
 * @param url - 原始圖片URL
 * @returns 替換後的圖片URL
 */
function replaceS3UrlWithCloudFront(url: string): string {
    if (!url) return url;

    const s3BucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
    const cloudFrontUrl = process.env.NEXT_PUBLIC_S3_CLOUDFRONT_URL;

    if (!s3BucketUrl || !cloudFrontUrl) {
        console.warn('Missing S3 or CloudFront URL in environment variables');
        return url;
    }

    return url.replace(s3BucketUrl, cloudFrontUrl);
}

export default replaceS3UrlWithCloudFront;