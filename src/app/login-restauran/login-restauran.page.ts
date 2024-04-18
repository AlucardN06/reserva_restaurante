import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UsuarioRestaurante } from '../registro-restauran/registro-restauran.page';

@Component({
  selector: 'app-login-restauran',
  templateUrl: './login-restauran.page.html',
  styleUrls: ['./login-restauran.page.scss'],
})
export class LoginRestauranPage {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) { }

  async login() {
    const usuarioAdmin = {
      email: 'admin',
      password: 'admin123'
    };

    if (
      this.loginData.email === usuarioAdmin.email &&
      this.loginData.password === usuarioAdmin.password
    ) {
      this.presentToast('Inicio de sesión como admin exitoso', 'success');
      this.navCtrl.navigateForward('/admin');
      return;
    }

    const usuariosRegistrados: UsuarioRestaurante[] = await this.storage.get('restaurantes') || [];
    const usuario = usuariosRegistrados.find(
      (u) => u.correo === this.loginData.email && u.contrasena === this.loginData.password
    );

    if (usuario) {
      this.presentToast('Inicio de sesión exitoso', 'success');
      await this.storage.set('usuario', usuario); // Guardar usuario en el almacenamiento local
      this.navCtrl.navigateForward('/admin-restauran'); // Redirigir a la página de administración de restaurante
    } else {
      this.presentToast('Credenciales incorrectas', 'danger');
    }
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
