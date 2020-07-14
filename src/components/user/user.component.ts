import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/model/interfaces/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user: IUser;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  showRepositories() {
    this.router.navigate([`repositories/${this.user.login}`]);
  }
}
