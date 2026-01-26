import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront";

const CustomMarkdownImageElement = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img src={replaceS3UrlWithCloudFront(src || '')} alt={alt || ''} {...props} />
  );
};

export default CustomMarkdownImageElement;