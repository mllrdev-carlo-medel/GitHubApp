import { gql } from 'apollo-boost';

export const GET_USERS = gql`
    query($cursor: String) {
        search(query: "a", type: USER, first: 10 after: $cursor)
        @connection(key: "user") {
          nodes {
            __typename
            ... on User {
              name
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

export const GET_USER_COUNT = gql`
    query {
        userPageNavCount @client
    }`;
