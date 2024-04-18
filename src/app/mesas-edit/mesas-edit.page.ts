import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mesas-edit',
  templateUrl: './mesas-edit.page.html',
  styleUrls: ['./mesas-edit.page.scss'],
})
export class MesasEditPage {
  mesa: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.mesa = this.navParams.get('mesa');
  }

  async guardarCambios() {
    // Implementa aquí la lógica para guardar los cambios en la mesa
    this.mostrarToast('Cambios guardados correctamente.', 'success');
    this.modalCtrl.dismiss(this.mesa);
  }

  reservarMesa() {
    // Cambia el estado de la reserva de la mesa a 'reservada'
    this.mesa.reservada = 'reservada';
    // Agrega la lógica para establecer la fecha y hora de reserva si es necesario
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async mostrarToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
