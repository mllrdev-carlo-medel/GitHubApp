import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query($login: String!, $cursor: String) {
        user(login: $login) @connection(key: "user") {
          repositories(first: 10 after: $cursor)
          @connection(key: "repository") {
            nodes {
      	      name
              id
              viewerHasStarred
      	    }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `;

export const GET_REPO_COUNT = gql`
    query {
        repositoryPageNavCount @client
    }`;
