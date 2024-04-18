import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

export interface UsuarioRestaurante {
  correo: string;
  nombre: string;
  nombreRestaurante: string;
  telefono: string;
  direccion: string;
  contrasena: string;
  mesas: Mesa[];
}

export interface Mesa {
  nombre: string;
  sillas: number;
  reservada: 'disponible' | 'reservada';
  fechaReserva?: string;
  horaReserva?: string;
  nombreReserva?: string; // Agrega la propiedad nombreReserva
}
@Component({
  selector: 'app-registro-restauran',
  templateUrl: './registro-restauran.page.html',
  styleUrls: ['./registro-restauran.page.scss'],
})
export class RegistroRestauranPage {
  registroRestauranData: UsuarioRestaurante = {
    correo: '',
    nombre: '',
    nombreRestaurante: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    mesas: []
  };
  confirmarContrasena: string = '';
  totalMesas: number = 5; // Establecer un valor predeterminado mínimo de 5 mesas

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

  async registerRestauran() {
    // Validar campos y contraseña
    if (this.registroRestauranData.contrasena !== this.confirmarContrasena) {
      this.presentToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    // Verificar que se hayan ingresado al menos 5 mesas
    if (this.totalMesas < 5) {
      this.presentToast('Debe ingresar al menos 5 mesas', 'danger');
      return;
    }

    // Agregar mesas al objeto registroRestauranData
    this.registroRestauranData.mesas = [];
    for (let i = 0; i < this.totalMesas; i++) {
      this.registroRestauranData.mesas.push({
        nombre: `Mesa ${i + 1}`,
        sillas: 4, // Puedes establecer un valor predeterminado aquí
        reservada: 'disponible'
      });
    }

    // Guardar datos en almacenamiento
    let restaurantes: UsuarioRestaurante[] = await this.storage.get('restaurantes') || [];
    restaurantes.push(this.registroRestauranData);
    await this.storage.set('restaurantes', restaurantes);

    // Mostrar mensaje de éxito y navegar a otra página
    this.presentToast('Registro exitoso', 'success');
    this.navCtrl.navigateForward('/login-restauran');
  }

  cancelarRegistro() {
    // Navegar hacia atrás o a otra página
    this.navCtrl.navigateBack('/login-restauran');
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
