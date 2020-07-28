import { Injectable } from '@angular/core';
import { GET_REPO_COUNT } from 'src/shared/constants/RepositoryQueries';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetRepositoriesGQL, GetRepositoriesQuery, GetRepositoriesQueryVariables } from 'src/app/graphql/generated/graphql';

@Injectable()
export class RepositoryService {
  static repositoryPageNavCount = 0;

  constructor(private apollo: Apollo,
              private getRepositoriesGql: GetRepositoriesGQL) {}

  getRepositories(userLogin: string, cursor: string | null = null) {
    return this.getRepositoriesGql.watch({login: userLogin, cursor});
  }

  fetchMoreRepositories(fetchUsersQuery: QueryRef<GetRepositoriesQuery, GetRepositoriesQueryVariables>, cursor?: string) {
    fetchUsersQuery.fetchMore({
      variables: { cursor },
      updateQuery: (prev, { fetchMoreResult }) => {

        if (!fetchMoreResult?.user?.repositories.nodes) {
          return prev;
        }

        if (prev.user?.repositories.nodes) {
          fetchMoreResult.user.repositories.nodes = [
            ...prev.user.repositories.nodes,
            ...fetchMoreResult.user.repositories.nodes,
          ];
        }

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
