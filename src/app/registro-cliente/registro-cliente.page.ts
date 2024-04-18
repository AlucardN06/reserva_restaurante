import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

interface Usuario {
  nombre: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage {
  registroData = {
    nombre: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  registrado: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    console.log('Storage initialized');
  }

  async register() {
    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    if (this.registroData.password.length < 8) {
      this.presentToast('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    const usuariosRegistrados: Usuario[] = await this.storage.get('usuarios') || [];
    const usuarioExistente = usuariosRegistrados.find((u: Usuario) => u.email === this.registroData.email);

    if (usuarioExistente) {
      this.presentToast('El correo electrónico ya está registrado');
      return;
    }

    usuariosRegistrados.push(this.registroData);
    await this.storage.set('usuarios', usuariosRegistrados);

    this.presentToast('Usuario registrado correctamente', 'success');
    this.registrado = true;
    this.navCtrl.navigateBack('/login-cliente');
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/login-cliente');
  }
}
