import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  constructor() {}

  calcularPrestamo(monto: number, tasaInteres: number, meses: number): number {
    const tasaMensual = tasaInteres / 100 / 12;
    if (tasaMensual === 0) {
      return monto / meses;
    }
    return (
      (monto * tasaMensual * Math.pow(1 + tasaMensual, meses)) /
      (Math.pow(1 + tasaMensual, meses) - 1)
    );
  }
}
