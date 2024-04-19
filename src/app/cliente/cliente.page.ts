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
  mesasMostradas: { restaurante: string, mesas: Mesa[] }[] = []; 
  restauranteSeleccionado: UsuarioRestaurante | null = null;

  constructor(
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    const usuarios: UsuarioRestaurante[] | null = await this.storage.get('restaurantes');
    if (usuarios) {
      this.usuarios = usuarios;
    }
  }

  async mostrarMesas(restaurante: UsuarioRestaurante) {
    const mesasDisponibles = restaurante.mesas.filter(mesa => mesa.reservada === 'disponible');
    this.mesasMostradas = [{ restaurante: restaurante.nombreRestaurante, mesas: mesasDisponibles }];
    this.restauranteSeleccionado = restaurante;
  }

  async confirmarReserva(mesa: Mesa) {
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
              this.reservarMesa(mesa, data.nombreReserva, data.fechaReserva, data.horaReserva);
            } else {
              this.mostrarAlerta('Error', 'Por favor, ingresa todos los datos para la reserva.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async reservarMesa(mesa: Mesa, nombreReserva: string, fechaReserva: string, horaReserva: string) {
    mesa.reservada = 'reservada';
    mesa.fechaReserva = fechaReserva;
    mesa.horaReserva = horaReserva;
    mesa.nombreReserva = nombreReserva;

    const mesaIndex: number = this.restauranteSeleccionado!.mesas.findIndex(m => m.nombre === mesa.nombre);
    if (mesaIndex !== -1) {
      this.restauranteSeleccionado!.mesas[mesaIndex] = mesa;
      await this.storage.set('restaurantes', this.usuarios);
    }

    const mesasDisponibles = this.restauranteSeleccionado!.mesas.filter(mesa => mesa.reservada === 'disponible');
    this.mesasMostradas = [{ restaurante: this.restauranteSeleccionado!.nombreRestaurante, mesas: mesasDisponibles }];

    // Abrir el botón de PayPal en una ventana emergente
    const paypalPopup = window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PXNW8DJ37B28N', 'PayPal Popup', 'width=600,height=400');
    if (!paypalPopup || paypalPopup.closed || typeof paypalPopup.closed === 'undefined') {
      this.mostrarAlerta('Error', 'Por favor, habilite las ventanas emergentes para continuar con el pago.');
    } else {
      paypalPopup.focus();
    }

    // Mostrar el mensaje de reserva exitosa después de abrir la ventana emergente
    this.mostrarAlerta('Éxito', 'Reserva realizada exitosamente.');
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
