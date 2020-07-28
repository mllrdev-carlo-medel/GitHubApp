import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/core/interfaces/IUser';
import { IPageInfo } from 'src/core/interfaces/IPageInfo';
import { UserService } from 'src/core/services/user/user.service';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: IUser[] = [];

  pageInfo!: IPageInfo;

  fetchUsersQuery!: QueryRef<any>;

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
    this.fetchUsersQuery.valueChanges.subscribe(({data}) => {
      this.users = data.search.nodes;
      this.pageInfo = data.search.pageInfo;
    });
  }
}
