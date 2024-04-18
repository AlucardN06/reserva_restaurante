import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroClientePageRoutingModule } from './registro-cliente-routing.module';
import { RegistroClientePage } from './registro-cliente.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroClientePageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [RegistroClientePage]
})
export class RegistroClientePageModule {}
