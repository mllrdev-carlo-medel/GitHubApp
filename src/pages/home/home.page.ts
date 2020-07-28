import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/core/interfaces/IUser';
import { IPageInfo } from 'src/core/interfaces/IPageInfo';
import { UserService } from 'src/core/services/user/user.service';
import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GetUsersQuery, GetUsersQueryVariables, User } from 'src/app/graphql/generated/graphql';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: IUser[] = [];
  pageInfo!: IPageInfo;
  fetchUsersQuery!: QueryRef<GetUsersQuery, GetUsersQueryVariables>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
    this.incrementUserPageNavCount();
  }

  incrementUserPageNavCount() {
    this.userService.incrementPageNavCount();
    this.userService.getUserPageNavCount().subscribe(({data}) => {
      console.log(data);
    });
  }

  getUsers() {
    this.fetchUsersQuery = this.userService.getUsers();
    this.fetchUsersQuery.valueChanges.subscribe((result) => {

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
    });
  }
}
