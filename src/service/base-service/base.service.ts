import { Injectable } from '@angular/core';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';


@Injectable()
export class BaseService {
  private cache = new InMemoryCache();
  protected client = new ApolloClient({
    cache: this.cache,
    uri: 'https://api.github.com/graphql',
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer 82d9843573ff90b5744033aef876aa7a8ae99de7`,
        },
      });
    }
  });

}
