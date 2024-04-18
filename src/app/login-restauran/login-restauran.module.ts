import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRestauranPageRoutingModule } from './login-restauran-routing.module';

import { LoginRestauranPage } from './login-restauran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRestauranPageRoutingModule
  ],
  declarations: [LoginRestauranPage]
})
export class LoginRestauranPageModule {}
