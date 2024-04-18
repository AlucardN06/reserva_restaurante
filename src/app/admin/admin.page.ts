import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { EditarPage } from '../editar/editar.page';
import { Editar2Page } from '../editar2/editar2.page';

interface Usuario {
  nombre: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  password: string;
}

interface UsuarioRestaurante {
  correo: string;
  nombre: string;
  nombreRestaurante: string;
  telefono: string;
  direccion: string;
  contrasena: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  usuariosCliente: Usuario[] = [];
  usuariosRestaurante: UsuarioRestaurante[] = [];
  edicionHabilitada = false;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.obtenerUsuariosCliente();
    this.obtenerUsuariosRestaurante();
  }

  async obtenerUsuariosCliente() {
    this.usuariosCliente = await this.storage.get('usuarios') || [];
  }

  async obtenerUsuariosRestaurante() {
    this.usuariosRestaurante = await this.storage.get('restaurantes') || [];
  }

  async editarUsuario(usuario: Usuario | UsuarioRestaurante) {
    this.edicionHabilitada = true;
    const modal = await this.modalCtrl.create({
      component: EditarPage,
      componentProps: { usuario }
    });

    modal.onDidDismiss().then((data: any) => {
      this.edicionHabilitada = false;
      if (data.data) {
        if ('fechaNacimiento' in usuario) {
          this.actualizarUsuario(data.data);
        } else {
          this.actualizarUsuarioRestaurante(data.data);
        }
      }
    });

    return await modal.present();
  }

  async actualizarUsuario(usuario: Usuario) {
    const index = this.usuariosCliente.findIndex(u => u.email === usuario.email);
    if (index !== -1) {
      this.usuariosCliente[index] = usuario;
      await this.storage.set('usuarios', this.usuariosCliente);
      this.mostrarToast('Usuario actualizado correctamente.', 'success');
    } else {
      this.mostrarToast('No se encontró al usuario.', 'danger');
    }
  }

  async actualizarUsuarioRestaurante(usuario: UsuarioRestaurante) {
    const index = this.usuariosRestaurante.findIndex(u => u.correo === usuario.correo);
    if (index !== -1) {
      this.usuariosRestaurante[index] = usuario;
      await this.storage.set('restaurantes', this.usuariosRestaurante);
      this.mostrarToast('Usuario restaurante actualizado correctamente.', 'success');
    } else {
      this.mostrarToast('No se encontró al usuario restaurante.', 'danger');
    }
  }

  async eliminarUsuario(usuario: Usuario | UsuarioRestaurante) {
    if ('fechaNacimiento' in usuario) {
      this.usuariosCliente = this.usuariosCliente.filter(u => u.email !== usuario.email);
      await this.storage.set('usuarios', this.usuariosCliente);
      this.mostrarToast('Usuario eliminado correctamente.', 'success');
    } else {
      this.usuariosRestaurante = this.usuariosRestaurante.filter(u => u.correo !== usuario.correo);
      await this.storage.set('restaurantes', this.usuariosRestaurante);
      this.mostrarToast('Usuario restaurante eliminado correctamente.', 'success');
    }
  }

  async mostrarToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  regresarALoginCliente() {
    this.navCtrl.navigateBack('/login-cliente');
  }

  regresarALoginRestaurante() {
    this.navCtrl.navigateBack('/login-restauran');
  }

  async editarUsuarioRestaurante(usuario: UsuarioRestaurante) {
    const modal = await this.modalCtrl.create({
      component: Editar2Page,
      componentProps: { usuario }
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        this.actualizarUsuarioRestaurante(data.data);
      }
    });

    return await modal.present();
  }
}
