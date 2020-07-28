import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/core/interfaces/IUser';
import { UserService } from 'src/core/services/user/user.service';
import { IPageInfo } from 'src/core/interfaces/IPageInfo';
import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GetUsersQuery, GetUsersQueryVariables, User } from 'src/app/graphql/generated/graphql';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[] = [];
  @Input() pageInfo!: IPageInfo;
  @Input() fetchUsersQuery!: QueryRef<GetUsersQuery, GetUsersQueryVariables>;
  scrollingDown = false;
  disableInfiniteScrolling = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getNextUsers(this.pageInfo.endCursor);
  }

  getUsers(event: { target: { complete: () => void; }; }) {
    this.fetchUsersQuery = this.userService.getUsers(this.pageInfo.endCursor);
    this.fetchUsersQuery.valueChanges.subscribe((result) => {
      if (this.scrollingDown && this.pageInfo.hasNextPage) {

        if (result.data.search.pageInfo.endCursor) {
          this.pageInfo = {
            endCursor: result.data.search.pageInfo.endCursor,
            hasNextPage: result.data.search.pageInfo.hasNextPage
          };

          const users: IUser[] = [];
          result.data.search.nodes?.slice(this.users.length).map(node => {
            const user: IUser = node as User;
            this.users.push(user);
          });
        }

        if (!this.pageInfo.hasNextPage) {
          this.disableInfiniteScrolling = true;
        }
      }
    });

    this.getNextUsers(this.pageInfo.endCursor);
    event.target.complete();
  }

  getNextUsers(cursor?: string) {
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
