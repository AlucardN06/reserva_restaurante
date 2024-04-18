import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRestauranPage } from './login-restauran.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRestauranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRestauranPageRoutingModule {}
