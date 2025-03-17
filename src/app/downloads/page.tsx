'use client'
import { csrClient } from '@/gql/client';
import { gql, useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const S3_BUCKET_URL = process.env.NEXT_PUBLIC_S3_BUCKET_URL || '';
const S3_CLOUDFRONT_URL = process.env.NEXT_PUBLIC_S3_CLOUDFRONT_URL || '';

const GET_UPLOADED_FILES = gql`
  query GetUploadedFiles {
    uploadFiles {
      documentId
      mime
      provider
      name
      url
    }
  }
`;

interface UploadedFile {
    documentId: string;
    mime: string;
    provider: string;
    name: string;
    url: string;
}

const DonloadFileList: React.FC = () => {
    const { loading, error, data } = useQuery<{ uploadFiles: UploadedFile[] }>(GET_UPLOADED_FILES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul className="mt-4 list-disc">
            {data?.uploadFiles.map((file: UploadedFile) => (
                <li key={file.documentId} className="mb-2">
                    <span className="text-lg font-semibold ">{file.name}</span>
                    <a
                        className="text-blue-500 hover:text-blue-700 p-2"
                        href={`${S3_CLOUDFRONT_URL}/${file.url.replace(new RegExp(S3_BUCKET_URL + '/?'), '')}`}
                        target="_blank"
                        download
                    >
                        Download
                    </a>
                </li>
            ))}
        </ul>
    );
}

function Downloads() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Download Area</h1>
            <DonloadFileList />
        </div>
    );
}

export default function App() {
    return (
        <ApolloProvider client={csrClient}>
            <Downloads />
        </ApolloProvider>
    );
}
