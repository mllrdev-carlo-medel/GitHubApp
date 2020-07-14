import { Component, OnInit, Input } from '@angular/core';
import { IRepository } from 'src/model/interfaces/IRepository';
import { IPageInfo } from 'src/model/interfaces/IPageInfo';
import { RepositoryService } from 'src/service/repository/repository.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  @Input() loginId: string;
  @Input() repositories: IRepository[];
  @Input() pageInfo: IPageInfo = null;
  scrollingDown = false;

   constructor(private repositoryService: RepositoryService) {
   }

   ngOnInit() {
   }

    async getRepositories(event) {
      await this.repositoryService.getRepositories(this.loginId, this.pageInfo.endCursor).then(({data}) => {

        if (this.scrollingDown && this.pageInfo.hasNextPage) {
           this.repositories.push(...data.user.repositories.nodes);
           this.pageInfo = data.user.repositories.pageInfo;
        }

        event.target.complete();
      });
   }

   onScroll(event) {
     if (event.detail.deltaY > 0) {
       this.scrollingDown = true;
     }
     else {
        this.scrollingDown = false;
     }
   }
}
