import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/core/interfaces/IUser';
import { UserService } from 'src/core/services/user/user.service';
import { IPageInfo } from 'src/core/interfaces/IPageInfo';
import { QueryRef } from 'apollo-angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[] = [];
  @Input() pageInfo!: IPageInfo;
  @Input() fetchUsersQuery!: QueryRef<any>;
  scrollingDown = false;

  disableInfiniteScrolling = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
     this.getNextUsers(this.pageInfo.endCursor);
  }

  getUsers(event: { target: { complete: () => void; }; }) {
    this.fetchUsersQuery = this.userService.getUsers(this.pageInfo.endCursor, false);
    this.fetchUsersQuery.valueChanges.subscribe(({data}) => {
      if (this.scrollingDown && this.pageInfo.hasNextPage) {
        this.users.push(...data.search.nodes.splice(this.users.length));
        this.pageInfo = data.search.pageInfo;

        if (!this.pageInfo.hasNextPage) {
          this.disableInfiniteScrolling = true;
        }
      }
    });

    this.getNextUsers(this.pageInfo.endCursor);

    event.target.complete();
  }

  getNextUsers(cursor: string) {
    if (this.pageInfo.hasNextPage) {
      this.userService.fetchMoreUsers(this.fetchUsersQuery, this.pageInfo.endCursor);
    }
  }

  onScroll(event: CustomEvent) {
    if (event.detail.deltaY > 0) {
     this.scrollingDown = true;
    }
    else {
      this.scrollingDown = false;
    }
  }
}
