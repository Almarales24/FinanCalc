import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ResultadoPrestamo {
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
}

@Injectable({ providedIn: 'root' })
export class CalculadoraService {
  private readonly KEY = 'financalc_prestamo';
  private resultadoSubject = new BehaviorSubject<ResultadoPrestamo | null>(this.cargar());

  resultado$ = this.resultadoSubject.asObservable();

  private cargar(): ResultadoPrestamo | null {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : null;
  }

  calcularPrestamo(monto: number, tasaInteres: number, meses: number): number {
    const tasaMensual = tasaInteres / 100 / 12;
    const cuotaMensual = tasaMensual === 0
      ? monto / meses
      : (monto * tasaMensual * Math.pow(1 + tasaMensual, meses)) /
        (Math.pow(1 + tasaMensual, meses) - 1);

    const totalPagar = cuotaMensual * meses;
    const totalIntereses = totalPagar - monto;

    const resultado = { cuotaMensual, totalPagar, totalIntereses };
    this.resultadoSubject.next(resultado);
    localStorage.setItem(this.KEY, JSON.stringify(resultado));

    return cuotaMensual;
  }
}