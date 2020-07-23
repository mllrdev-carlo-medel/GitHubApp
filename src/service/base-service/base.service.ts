import { Injectable } from '@angular/core';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import { environment } from '../../environments/environment';


@Injectable()
export class BaseService {
  private cache = new InMemoryCache();
  protected client = new ApolloClient({
    cache: this.cache,
    resolvers: {},
    uri: 'https://api.github.com/graphql',
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${environment.TOKEN}`,
        },
      });
    }
  });

}
