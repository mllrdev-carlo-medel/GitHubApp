import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRepository } from 'src/model/interfaces/IRepository';
import { IPageInfo } from 'src/model/interfaces/IPageInfo';
import { RepositoryService } from 'src/service/repository/repository.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.page.html',
  styleUrls: ['./repositories.page.scss'],
})
export class RepositoriesPage implements OnInit {
  repositories: IRepository[];
  pageInfo: IPageInfo = null;
  loginId: string;
  dataAvailable = false;
  constructor(private route: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit() {
    this.getLoginId();
    this.getRepositories(this.loginId);
    this.incrementRepositoryPageNavCount();
  }

  incrementRepositoryPageNavCount() {
    this.repositoryService.incrementRepositoryNavCount();
    this.repositoryService.getRepositoryPageNavCount().then(({data}) => {
      console.log(data.repositoryPageNavCount);
    });
  }

  getLoginId() {
    this.loginId = this.route.snapshot.paramMap.get('id');
  }

  async getRepositories(loginId: string) {
    await this.repositoryService.getRepositories(loginId).then(({data}) => {
       this.repositories = data.user.repositories.nodes;
       this.pageInfo = data.user.repositories.pageInfo;
       this.dataAvailable = true;
    });
  }
}
