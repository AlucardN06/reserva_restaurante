import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesasEditPageRoutingModule } from './mesas-edit-routing.module';

import { MesasEditPage } from './mesas-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesasEditPageRoutingModule
  ],
  declarations: [MesasEditPage]
})
export class MesasEditPageModule {}
