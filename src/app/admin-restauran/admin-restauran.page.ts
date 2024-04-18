import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UsuarioRestaurante, Mesa } from '../registro-restauran/registro-restauran.page';
import { MesasEditPage } from '../mesas-edit/mesas-edit.page';

@Component({
  selector: 'app-admin-restauran',
  templateUrl: './admin-restauran.page.html',
  styleUrls: ['./admin-restauran.page.scss'],
})
export class AdminRestauranPage {
  usuario: UsuarioRestaurante | null = null;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    const usuario = await this.storage.get('usuario');
    if (usuario) {
      this.usuario = usuario;
    }
  }

  async salir() {
    await this.storage.remove('usuario');
    this.navCtrl.navigateRoot('/login-restauran');
  }

  async editarMesa(index: number) {
    const modal = await this.modalCtrl.create({
      component: MesasEditPage,
      componentProps: {
        mesa: this.usuario?.mesas ? this.usuario.mesas[index] : null
      }
    });

    modal.onDidDismiss().then((data) => {
      const mesaEditada = data?.data;
      if (mesaEditada && this.usuario && this.usuario.mesas) {
        this.usuario.mesas[index] = mesaEditada;
        this.guardarDatosUsuario();
      }
    });

    return await modal.present();
  }


  

  async guardarDatosUsuario() {
    await this.storage.set('usuario', this.usuario);
  }

  async actualizarReservaEnInterfaz(mesa: Mesa, index: number) {
    // Actualiza la reserva en la interfaz después de una cancelación
    if (this.usuario && this.usuario.mesas) {
      this.usuario.mesas[index] = mesa;
      await this.guardarDatosUsuario();
      this.mostrarToast('Reserva cancelada correctamente.');
    }
  }

  async mostrarToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
