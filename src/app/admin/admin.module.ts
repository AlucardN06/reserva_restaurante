import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Asegúrate de que IonicModule esté incluido aquí
    AdminPageRoutingModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
