import { API_URL } from "@/app/projects/page";
import { ApolloClient, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
});
