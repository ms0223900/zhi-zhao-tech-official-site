
const CustomMarkdownAnchorElement = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const decodedHref = decodeURIComponent(href || '');
  const decodedChildren = typeof children === 'string' ? decodeURIComponent(children) : children;
  return (
    <a
      {...props}
      href={decodedHref}
      className="text-blue-500 hover:text-blue-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      {decodedChildren}
    </a>
  );
};

export default CustomMarkdownAnchorElement;