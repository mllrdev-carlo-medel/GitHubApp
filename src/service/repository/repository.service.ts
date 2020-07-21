import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { gql } from 'apollo-boost';

@Injectable()
export class RepositoryService extends BaseService {
  async getRepositories(userLogin: string, cursor: string = null) {
    const GET_REPOSITORIES = gql`
      query($login: String!, $cursor: String) {
        user(login: $login) {
          repositories(first: 10 after: $cursor) {
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

    return await this.client.query({
      query: GET_REPOSITORIES,
      variables: {
        login: userLogin,
        cursor
      },
      fetchPolicy: 'cache-first'
    });
  }
}
