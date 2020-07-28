import { gql } from 'apollo-boost';

export const GET_REPO_COUNT = gql`
    query {
        repositoryPageNavCount @client
    }`;
