import { Injectable } from '@angular/core';
import { GET_REPOSITORIES, GET_REPO_COUNT } from 'src/shared/constants/RepositoryQueries';
import { Apollo, QueryRef } from 'apollo-angular';

@Injectable()
export class RepositoryService {
  static repositoryPageNavCount = 0;

  constructor(private apollo: Apollo) {}

  getRepositories(userLogin: string, cursor: string | null = null, fetchFromNetwork: boolean = true) {
    return this.apollo.watchQuery<any>({
      query: GET_REPOSITORIES,
      variables: {
        login: userLogin,
        cursor
      },
      fetchPolicy: fetchFromNetwork ? 'network-only' : 'cache-first',
    });
  }

  fetchMoreRepositories(fetchUsersQuery: QueryRef<any>, cursor: string) {
    fetchUsersQuery.fetchMore({
      variables: { cursor },
      updateQuery: (prev, { fetchMoreResult }) => {

        if (!fetchMoreResult) {
          return prev;
        }

        fetchMoreResult.user.repositories.nodes = [
          ...prev.user.repositories.nodes,
          ...fetchMoreResult.user.repositories.nodes,
        ];

        return fetchMoreResult;
      },
    });
  }

  getRepositoryPageNavCount() {
    return this.apollo.query({query: GET_REPO_COUNT});
  }

  incrementRepositoryNavCount() {
    this.apollo.getClient().cache.writeData({ data: {repositoryPageNavCount: ++RepositoryService.repositoryPageNavCount} });
  }
}
