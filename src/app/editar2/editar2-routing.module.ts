import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Editar2Page } from './editar2.page';

const routes: Routes = [
  {
    path: '',
    component: Editar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Editar2PageRoutingModule {}
