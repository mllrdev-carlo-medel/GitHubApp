import { Component, OnInit, Input } from '@angular/core';
import { IRepository } from 'src/core/interfaces/IRepository';
import { IPageInfo } from 'src/core/interfaces/IPageInfo';
import { RepositoryService } from 'src/core/services/repository/repository.service';
import { QueryRef } from 'apollo-angular';
import { GetRepositoriesQuery, GetRepositoriesQueryVariables, Repository } from 'src/app/graphql/generated/graphql';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  @Input() loginId!: string;
  @Input() repositories: IRepository[] = [];
  @Input() pageInfo!: IPageInfo;
  @Input() fetchRepositoriesQuery!: QueryRef<GetRepositoriesQuery, GetRepositoriesQueryVariables>;
  scrollingDown = false;
  disableInfiniteScrolling = false;

  constructor(private repositoryService: RepositoryService) {}

  ngOnInit() {
    this.getNextRepositories(this.loginId, this.pageInfo.endCursor);
  }

  getRepositories(event: { target: { complete: () => void; }; }) {
    this.fetchRepositoriesQuery = this.repositoryService.getRepositories(this.loginId, this.pageInfo.endCursor);
    this.fetchRepositoriesQuery.valueChanges.subscribe((result) => {
      if (this.scrollingDown && this.pageInfo.hasNextPage) {

        if (result.data.user?.repositories.pageInfo.endCursor) {
          this.pageInfo = {
            endCursor: result.data.user?.repositories.pageInfo.endCursor,
            hasNextPage: result.data.user?.repositories.pageInfo.hasNextPage
          };

          const repository: IRepository[] = [];
          result.data.user?.repositories.nodes?.slice(this.repositories.length).map((node) => {
            const user: IRepository = node as Repository;
            this.repositories.push(user);
          });
        }

        if (!this.pageInfo.hasNextPage) {
          this.disableInfiniteScrolling = true;
        }
      }
    });

    this.getNextRepositories(this.loginId, this.pageInfo.endCursor);
    event.target.complete();
  }

  getNextRepositories(id: string, cursor?: string) {
    if (this.pageInfo.hasNextPage) {
      this.repositoryService.fetchMoreRepositories(this.fetchRepositoriesQuery, this.pageInfo.endCursor);
    }
  }

  onScroll(event: CustomEvent) {
    if (event.detail.deltaY > 0) {
      this.scrollingDown = true;
    } else {
      this.scrollingDown = false;
    }
  }
}
