import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { gql } from 'apollo-boost';
import { GET_REPOSITORIES, GET_REPO_COUNT } from 'src/shared/constants/RepositoryQueries';

@Injectable()
export class RepositoryService extends BaseService {
  static repositoryPageNavCount = 0;

  constructor() {
    super();
    this.client.cache.writeData({
      data: { repositoryPageNavCount: RepositoryService.repositoryPageNavCount }
    });
  }

  async getRepositories(userLogin: string, cursor: string = null, fetchFromNetwork: boolean = false) {
    return await this.client.query({
      query: GET_REPOSITORIES,
      variables: {
        login: userLogin,
        cursor
      },
      fetchPolicy: fetchFromNetwork ? 'no-cache' : 'cache-first'
    });
  }

  updateRepositoryCache(login: string, data: any) {
    try {
      const cacheData = this.client.readQuery({query: GET_REPOSITORIES, variables: { login }});

      cacheData.user.repositories.pageInfo = data.user.repositories.pageInfo;
      cacheData.user.repositories.nodes = [...cacheData.user.repositories.nodes, ...data.user.repositories.nodes];

      this.client.writeQuery({query: GET_REPOSITORIES, data: cacheData});
    }
    catch (Exception) {
      console.log(Exception);
      return;
    }
  }

  async getRepositoryPageNavCount() {
    return await this.client.query({query: GET_REPO_COUNT});
  }

  incrementRepositoryNavCount() {
    this.client.cache.writeData({ data: {repositoryPageNavCount: ++RepositoryService.repositoryPageNavCount} });
  }
}
