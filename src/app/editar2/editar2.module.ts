import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Editar2PageRoutingModule } from './editar2-routing.module';

import { Editar2Page } from './editar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Editar2PageRoutingModule
  ],
  declarations: [Editar2Page]
})
export class Editar2PageModule {}
