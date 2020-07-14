import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from 'src/pages/home/home.module';
import { HomePage } from 'src/pages/home/home.page';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'repositories/:id',
    loadChildren: () => import('../pages/repositories/repositories.module').then( m => m.RepositoriesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
