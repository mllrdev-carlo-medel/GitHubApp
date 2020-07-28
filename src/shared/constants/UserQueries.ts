import { gql } from 'apollo-boost';

export const GET_USER_COUNT = gql`
    query {
        userPageNavCount @client
    }`;

export const QUERY_STRING = 'a';
