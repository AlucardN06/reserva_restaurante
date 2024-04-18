import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesasEditPage } from './mesas-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MesasEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesasEditPageRoutingModule {}
