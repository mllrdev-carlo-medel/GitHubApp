import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/model/interfaces/IUser';
import { IPageInfo } from 'src/model/interfaces/IPageInfo';
import { UserService } from 'src/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: IUser[] = [];

  pageInfo: IPageInfo;

  dataAvailable = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    await this.userService.getUsers().then(({data}) => {
      this.users = data.search.nodes;
      this.pageInfo = data.search.pageInfo;
      this.dataAvailable = true;
    });
  }
}
