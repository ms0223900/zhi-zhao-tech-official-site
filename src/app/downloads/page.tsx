'use client'
import { gql, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:1337/graphql';

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

function Downloads() {
    const { loading, error, data } = useQuery<{ uploadFiles: UploadedFile[] }>(GET_UPLOADED_FILES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Download Area</h1>
            <ul className="mt-4 list-disc">
                {data?.uploadFiles.map((file: UploadedFile) => (
                    <li key={file.documentId} className="mb-2">
                        <span className="text-lg font-semibold ">{file.name}</span>
                        <a
                            className="text-blue-500 hover:text-blue-700 p-2"
                            href={`https://d3dobgs0mffzva.cloudfront.net/${file.url.replace('https://dev-penguin.s3.ap-southeast-1.amazonaws.com/', '')}`}
                            target="_blank"
                            download
                        >
                            Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function App() {
    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <Downloads />
        </ApolloProvider>
    );
}
