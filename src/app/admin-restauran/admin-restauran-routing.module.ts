import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRestauranPage } from './admin-restauran.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRestauranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRestauranPageRoutingModule {}
