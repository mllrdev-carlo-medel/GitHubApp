import { Injectable, OnInit } from '@angular/core';
import { GET_USER_COUNT } from '../../../shared/constants/UserQueries';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetUsersGQL, GetUsersQuery, GetUsersQueryVariables } from 'src/app/graphql/generated/graphql';

@Injectable()
export class UserService {
  static userPageNavCount = 0;

  constructor(private apollo: Apollo,
              private getUsersGql: GetUsersGQL) {}

  getUsers(cursor: string | null = null) {
    return this.getUsersGql.watch({cursor});
  }

  fetchMoreUsers(fetchUsersQuery: QueryRef<GetUsersQuery, GetUsersQueryVariables>, cursor?: string) {
    fetchUsersQuery.fetchMore({
      variables: { cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.search.nodes) {
          return prev;
        }

        if (prev.search.nodes) {
          fetchMoreResult.search.nodes = [...prev.search.nodes, ...fetchMoreResult.search.nodes];
        }

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

