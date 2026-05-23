export interface Prestamo {
  monto: number;
  tasaInteres: number;
  meses: number;
  cuotaMensual?: number;
}

export interface ResultadoCalculo {
  cuotaMensual: number;
  totalAPagar: number;
  totalInteres: number;
}
