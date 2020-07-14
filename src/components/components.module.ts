import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  declarations: [ UserListComponent, UserComponent, RepositoryListComponent, RepositoryComponent ],
  imports: [ IonicModule, CommonModule, FormsModule ],
  exports: [ UserListComponent, UserComponent, RepositoryListComponent, RepositoryComponent ],
  entryComponents: [ ]
})
export class ComponentsModule {}
