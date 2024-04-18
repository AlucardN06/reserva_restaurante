import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

interface Usuario {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.page.html',
  styleUrls: ['./login-cliente.page.scss'],
})
export class LoginClientePage {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

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
      // Redirigir al usuario a la página de admin
      this.navCtrl.navigateForward('/admin');
      return;
    }

    const usuariosRegistrados: Usuario[] = await this.storage.get('usuarios') || [];
    const usuario = usuariosRegistrados.find(
      (u) => u.email === this.loginData.email && u.password === this.loginData.password
    );

    if (usuario) {
      this.presentToast('Inicio de sesión exitoso', 'success');
      // Redirigir al usuario a la página de cliente
      this.navCtrl.navigateForward('/cliente');
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
