import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRestauranPageRoutingModule } from './admin-restauran-routing.module';

import { AdminRestauranPage } from './admin-restauran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRestauranPageRoutingModule
  ],
  declarations: [AdminRestauranPage]
})
export class AdminRestauranPageModule {}
