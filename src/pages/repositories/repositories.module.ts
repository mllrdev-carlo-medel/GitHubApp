import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepositoriesPageRoutingModule } from './repositories-routing.module';

import { RepositoriesPage } from './repositories.page';
import { SharedModule } from 'src/shared/shared.module';
import { RepositoryComponent } from './components/repository/repository.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepositoriesPageRoutingModule,
    SharedModule
  ],
  declarations: [
    RepositoriesPage,
    RepositoryComponent,
    RepositoryListComponent
  ]
})
export class RepositoriesPageModule {}
