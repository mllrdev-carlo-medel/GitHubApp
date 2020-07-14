import { Injectable } from '@angular/core';
import ApolloClient, { gql } from 'apollo-boost';


@Injectable()
export class BaseService {
  protected client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer c824d3abc6307a982dd6524f905d5cb1d4da5168`,
        },
      });
    }
  });

}
