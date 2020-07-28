import { Injectable, OnInit } from '@angular/core';
import { GET_USERS, GET_USER_COUNT } from '../../../shared/constants/UserQueries';
import { Apollo, QueryRef } from 'apollo-angular';

@Injectable()
export class UserService {
  static userPageNavCount = 0;

  constructor(private apollo: Apollo) {}

  getUsers(cursor: string | null = null, fetchFromNetwork: boolean = true) {
    return this.apollo.watchQuery<any>({
      query: GET_USERS,
      variables: { cursor },
      fetchPolicy: fetchFromNetwork ? 'network-only' : 'cache-first',
    });
  }

  fetchMoreUsers(fetchUsersQuery: QueryRef<any>, cursor: string) {
    fetchUsersQuery.fetchMore({
      variables: { cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        fetchMoreResult.search.nodes = [
          ...prev.search.nodes,
          ...fetchMoreResult.search.nodes,
        ];
        return fetchMoreResult;
      },
    });
  }

  getUserPageNavCount() {
    return this.apollo.query({ query: GET_USER_COUNT });
  }

  incrementPageNavCount() {
    this.apollo
      .getClient()
      .cache.writeData({
        data: { userPageNavCount: ++UserService.userPageNavCount },
      });
  }
}
