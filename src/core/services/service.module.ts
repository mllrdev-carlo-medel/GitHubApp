import { NgModule } from '@angular/core';
import { UserService } from './user/user.service';
import { RepositoryService } from './repository/repository.service';

@NgModule({
  providers: [ UserService, RepositoryService ]
})
export class ServiceModule {}
