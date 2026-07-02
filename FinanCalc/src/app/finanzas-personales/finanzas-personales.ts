import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Movimiento {
  id: number;
  tipo: 'ingreso' | 'gasto';
  descripcion: string;
  categoria: string;
  monto: number;
  fecha: string;
}

@Component({
  selector: 'app-finanzas-personales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finanzas-personales.html',
})
export class FinanzasPersonalesComponent {
  movimientos: Movimiento[] = [];
  nextId = 1;

  tipoForm: 'ingreso' | 'gasto' = 'ingreso';
  descripcionForm = '';
  categoriaForm = '';
  montoForm: number = 0;
  fechaForm = new Date().toISOString().split('T')[0];

  categoriasGasto = ['Alimentación', 'Transporte', 'Vivienda', 'Salud', 'Educación', 'Entretenimiento', 'Ropa', 'Otros'];
  categoriasIngreso = ['Salario', 'Freelance', 'Inversiones', 'Negocio', 'Otros'];

  get categorias() {
    return this.tipoForm === 'ingreso' ? this.categoriasIngreso : this.categoriasGasto;
  }

  get totalIngresos() {
    return this.movimientos.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + m.monto, 0);
  }

  get totalGastos() {
    return this.movimientos.filter(m => m.tipo === 'gasto').reduce((s, m) => s + m.monto, 0);
  }

  get balance() {
    return this.totalIngresos - this.totalGastos;
  }

  agregar() {
    if (!this.descripcionForm || !this.categoriaForm || this.montoForm <= 0) return;
    this.movimientos.unshift({
      id: this.nextId++,
      tipo: this.tipoForm,
      descripcion: this.descripcionForm,
      categoria: this.categoriaForm,
      monto: this.montoForm,
      fecha: this.fechaForm,
    });
    this.descripcionForm = '';
    this.categoriaForm = '';
    this.montoForm = 0;
  }

  eliminar(id: number) {
    this.movimientos = this.movimientos.filter(m => m.id !== id);
  }

  onTipoChange() {
    this.categoriaForm = '';
  }
}