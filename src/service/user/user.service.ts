import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { gql } from 'apollo-boost';
import { GET_USERS, GET_USER_COUNT } from '../../shared/constants/UserQueries';


@Injectable()
export class UserService extends BaseService {
  static userPageNavCount = 0;

  constructor() {
    super();
    this.client.cache.writeData({
      data: { userPageNavCount: UserService.userPageNavCount}
    });
  }



  async getUsers(cursor: string = null, fetchFromNetwork: boolean = false) {
    return await this.client.query({
      query: GET_USERS,
      variables: { cursor },
      fetchPolicy: fetchFromNetwork ? 'no-cache' : 'cache-first',
    });
  }

  updateUsersCache(data: any) {
    try {
      const cacheData = this.client.readQuery({query: GET_USERS });

      cacheData.search.pageInfo = data.search.pageInfo;
      cacheData.search.nodes = [...cacheData.search.nodes, ...data.search.nodes];
      this.client.writeQuery({query: GET_USERS, data: cacheData });
    }
    catch (Exception) {
      console.log(Exception);
      return;
    }
  }

  async getUserPageNavCount() {
    return await this.client.query({query: GET_USER_COUNT});
  }

  incrementPageNavCount() {
    this.client.cache.writeData ({ data: {userPageNavCount: ++UserService.userPageNavCount} });
  }
}
