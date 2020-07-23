import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { gql } from 'apollo-boost';
import { pipe } from 'rxjs';

@Injectable()
export class UserService extends BaseService {
  static userPageNavCount = 0;

  constructor() {
    super();
    this.client.cache.writeData({
      data: { userPageNavCount: UserService.userPageNavCount}
    });
  }

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

    return await this.client.query({
      query: GET_USERS,
      variables: { cursor },
      fetchPolicy: 'cache-first'});
  }

  async getUserPageNavCount() {
    const GET_COUNT = gql`
      query {
        userPageNavCount @client
      }
    `;

    return await this.client.query({query: GET_COUNT});
  }

  incrementPageNavCount() {
    this.client.cache.writeData ({ data: {userPageNavCount: ++UserService.userPageNavCount} });
  }
}
