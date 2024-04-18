import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UsuarioRestaurante, Mesa } from '../registro-restauran/registro-restauran.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage {
  usuarios: UsuarioRestaurante[] = [];

  constructor(private storage: Storage, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    const usuarios: UsuarioRestaurante[] | null = await this.storage.get('restaurantes');
    if (usuarios) {
      this.usuarios = usuarios;
    }
  }

  async confirmarReserva(restaurante: UsuarioRestaurante, mesa: Mesa) {
    if (mesa.reservada === 'disponible') {
      const alert = await this.alertController.create({
        header: 'Confirmación de Reserva',
        message: 'Por favor, ingresa el nombre de la persona para quien se realizará la reserva:',
        inputs: [
          {
            name: 'nombreReserva',
            type: 'text',
            placeholder: 'Nombre'
          },
          {
            name: 'fechaReserva',
            type: 'date',
            min: new Date().toISOString()
          },
          {
            name: 'horaReserva',
            type: 'time'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Reservar',
            handler: (data) => {
              if (data.nombreReserva && data.fechaReserva && data.horaReserva) {
                this.reservarMesa(restaurante, mesa, data.nombreReserva, data.fechaReserva, data.horaReserva);
              } else {
                // Mostrar mensaje de error si no se ingresan todos los datos
                this.mostrarAlerta('Error', 'Por favor, ingresa todos los datos para la reserva.');
              }
            }
          },
          {
            text: 'Cancelar Reserva',
            handler: () => {
              this.cancelarReserva(mesa);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async reservarMesa(restaurante: UsuarioRestaurante, mesa: Mesa, nombreReserva: string, fechaReserva: string, horaReserva: string) {
    mesa.reservada = 'reservada';
    mesa.fechaReserva = fechaReserva;
    mesa.horaReserva = horaReserva;
    mesa.nombreReserva = nombreReserva;

    // Encuentra el restaurante en el arreglo de usuarios
    const restauranteIndex: number = this.usuarios.findIndex(u => u.nombreRestaurante === restaurante.nombreRestaurante);
    if (restauranteIndex !== -1) {
      // Encuentra la mesa en el restaurante
      const mesaIndex: number = this.usuarios[restauranteIndex].mesas.findIndex(m => m.nombre === mesa.nombre);
      if (mesaIndex !== -1) {
        // Actualiza la mesa en el restaurante
        this.usuarios[restauranteIndex].mesas[mesaIndex] = mesa;
        // Guarda los cambios en el almacenamiento
        await this.storage.set('restaurantes', this.usuarios);
      }
    }

    // Mostrar mensaje de éxito
    this.mostrarAlerta('Éxito', 'Reserva realizada exitosamente.');
  }

  async cancelarReserva(mesa: Mesa) {
    mesa.reservada = 'disponible';
    mesa.fechaReserva = undefined;
    mesa.horaReserva = undefined;
    mesa.nombreReserva = undefined;

    // Encuentra el usuario que tiene esta mesa reservada
    const usuarioIndex: number = this.usuarios.findIndex(u => u.mesas.some(m => m.nombre === mesa.nombre));
    if (usuarioIndex !== -1) {
      const mesaIndex: number = this.usuarios[usuarioIndex].mesas.findIndex(m => m.nombre === mesa.nombre);
      if (mesaIndex !== -1) {
        this.usuarios[usuarioIndex].mesas[mesaIndex] = mesa;
        await this.storage.set('restaurantes', this.usuarios); // Actualiza los datos en el almacenamiento
      }
    }

    this.mostrarAlerta('Éxito', 'Reserva cancelada exitosamente.');
}

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
