import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movimiento } from '../finanzas-personales/finanzas-personales';

@Injectable({ providedIn: 'root' })
export class FinanzasService {
  private readonly KEY = 'financalc_movimientos';
  private movimientosSubject = new BehaviorSubject<Movimiento[]>(this.cargar());

  movimientos$ = this.movimientosSubject.asObservable();

  private cargar(): Movimiento[] {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : [];
  }

  private guardar(movimientos: Movimiento[]) {
    localStorage.setItem(this.KEY, JSON.stringify(movimientos));
  }

  agregar(m: Movimiento) {
    const actualizados = [m, ...this.movimientosSubject.value];
    this.movimientosSubject.next(actualizados);
    this.guardar(actualizados);
  }

  eliminar(id: number) {
    const actualizados = this.movimientosSubject.value.filter(m => m.id !== id);
    this.movimientosSubject.next(actualizados);
    this.guardar(actualizados);
  }

  getMovimientos(): Movimiento[] {
    return this.movimientosSubject.value;
  }
}