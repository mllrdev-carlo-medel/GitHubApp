import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { environment } from 'src/environments/environment';
import { ApolloLink } from 'apollo-link';

export function createApollo(httpLink: HttpLink) {
  const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
          types: [],
        },
      },
    }),
  });

  const uri = 'https://api.github.com/graphql';

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${environment.TOKEN}`,
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return { link, cache, resolvers: {} };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
