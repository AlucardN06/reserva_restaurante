import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) { }

  async openDatabase() {
    this.db = await this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    });
  }

  async createTables() {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS usuarios_restaurante (
          id_usuario INTEGER PRIMARY KEY,
          nombre TEXT,
          restaurante TEXT,
          email TEXT,
          telefono TEXT,
          otra_informacion TEXT,
          contrasena TEXT
        );
      `, []);

      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS mesas (
          id_mesa INTEGER PRIMARY KEY,
          id_usuario INTEGER,
          numero INTEGER,
          capacidad INTEGER,
          disponible INTEGER,
          FOREIGN KEY (id_usuario) REFERENCES usuarios_restaurante(id_usuario)
        );
      `, []);

      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS sillas (
          id_silla INTEGER PRIMARY KEY,
          id_mesa INTEGER,
          numero INTEGER,
          disponible INTEGER,
          FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa)
        );
      `, []);

      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS usuarios_cliente (
          id_usuario INTEGER PRIMARY KEY,
          nombre TEXT,
          email TEXT,
          telefono TEXT,
          otra_informacion TEXT,
          contrasena TEXT
        );
      `, []);
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  async getDatabase() {
    if (!this.db) {
      await this.openDatabase();
      await this.createTables();
    }

    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return this.db;
  }

  async registrarCliente(nombre: string, email: string, telefono: string, contrasena: string) {
    const db = await this.getDatabase();
    await db.executeSql(
      `INSERT INTO usuarios_cliente (nombre, email, telefono, contrasena) VALUES (?, ?, ?, ?)`,
      [nombre, email, telefono, contrasena]
    );
  }

  async loginCliente(email: string, contrasena: string): Promise<boolean> {
    const db = await this.getDatabase();
    const result = await db.executeSql(
      `SELECT * FROM usuarios_cliente WHERE email = ? AND contrasena = ?`,
      [email, contrasena]
    );
    return result.rows.length > 0;
  }

}
