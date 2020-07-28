import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRepository } from 'src/core/interfaces/IRepository';
import { IPageInfo } from 'src/core/interfaces/IPageInfo';
import { RepositoryService } from 'src/core/services/repository/repository.service';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.page.html',
  styleUrls: ['./repositories.page.scss'],
})
export class RepositoriesPage implements OnInit {
  repositories: IRepository[] = [];
  pageInfo!: IPageInfo;
  loginId!: string;
  fetchRepositoriesQuery!: QueryRef<any>;
  constructor(private route: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit() {
    this.getLoginId();
    this.getRepositories(this.loginId);
    this.incrementRepositoryPageNavCount();
  }

  incrementRepositoryPageNavCount() {
    this.repositoryService.incrementRepositoryNavCount();
    this.repositoryService.getRepositoryPageNavCount().subscribe(({data}) => {
      console.log(data);
    });
  }

  getLoginId() {
    const value = this.route.snapshot.paramMap.get('id');
    this.loginId = value ? value : '';
  }

  getRepositories(loginId: string) {
    this.fetchRepositoriesQuery = this.repositoryService.getRepositories(loginId);
    this.fetchRepositoriesQuery.valueChanges.subscribe(({data}) => {
       this.repositories = data.user.repositories.nodes;
       this.pageInfo = data.user.repositories.pageInfo;
    });
  }
}
