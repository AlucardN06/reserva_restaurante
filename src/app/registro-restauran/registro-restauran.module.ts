import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroRestauranPageRoutingModule } from './registro-restauran-routing.module';

import { RegistroRestauranPage } from './registro-restauran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroRestauranPageRoutingModule
  ],
  declarations: [RegistroRestauranPage]
})
export class RegistroRestauranPageModule {}
