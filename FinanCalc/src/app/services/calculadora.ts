import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DatosPrestamo {
  monto: number;
  tasaAnual: number;
  plazoMeses: number;
}

export interface FilaAmortizacion {
  mes: number;
  cuota: number;
  capital: number;
  interes: number;
  saldo: number;
}

export interface ResultadoPrestamo {
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
  tablaAmortizacion: FilaAmortizacion[];
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

  private guardar(resultado: ResultadoPrestamo) {
    localStorage.setItem(this.KEY, JSON.stringify(resultado));
  }

  calcular(datos: DatosPrestamo): void {
    const { monto, tasaAnual, plazoMeses } = datos;
    const tasaMensual = tasaAnual / 100 / 12;
    const n = plazoMeses;
    const P = monto;

    let cuotaMensual: number;
    if (tasaMensual === 0) {
      cuotaMensual = P / n;
    } else {
      cuotaMensual = (P * (tasaMensual * Math.pow(1 + tasaMensual, n))) /
                     (Math.pow(1 + tasaMensual, n) - 1);
    }

    const totalPagar = cuotaMensual * n;
    const totalIntereses = totalPagar - P;

    const tablaAmortizacion: FilaAmortizacion[] = [];
    let saldo = P;
    for (let i = 1; i <= n; i++) {
      const interes = saldo * tasaMensual;
      const capital = cuotaMensual - interes;
      saldo -= capital;
      tablaAmortizacion.push({
        mes: i,
        cuota: cuotaMensual,
        capital,
        interes,
        saldo: saldo < 0 ? 0 : saldo,
      });
    }

    const resultado = { cuotaMensual, totalPagar, totalIntereses, tablaAmortizacion };
    this.resultadoSubject.next(resultado);
    this.guardar(resultado);
  }
}