import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/model/interfaces/IUser';
import { UserService } from 'src/service/user/user.service';
import { IPageInfo } from 'src/model/interfaces/IPageInfo';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[] = [];
  @Input() pageInfo: IPageInfo;
  scrollingDown = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  async getUsers(event) {
    await this.userService.getUsers(this.pageInfo.endCursor).then(({data}) => {
      if (this.scrollingDown && this.pageInfo.hasNextPage) {
        this.users.push(...data.search.nodes);
        this.pageInfo = data.search.pageInfo;

        event.target.complete();
      }
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
