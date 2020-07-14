import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { gql } from 'apollo-boost';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class UserService extends BaseService {
  async getUsers(cursor: string = null) {
    const GET_USERS = gql`
      query($cursor: String) {
        search(query: "a", type: USER, first: 10 after: $cursor) {
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

    return await this.client.query({query: GET_USERS, variables: { cursor }});
  }
}
