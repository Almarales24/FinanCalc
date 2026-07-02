import { describe, it, expect, beforeEach } from 'vitest';
import { FinanzasService } from '../../src/app/services/finanzas';

describe('Servicio Finanzas', () => {
  let service: FinanzasService;

  beforeEach(() => {
    service = new FinanzasService();
    localStorage.clear();
  });

  it('debe agregar y recuperar movimientos', () => {
    const movimiento = { id: 1, tipo: 'gasto', descripcion: 'Prueba', categoria: 'Alimentación', monto: 100, fecha: '2026-07-01' };
    service.agregar(movimiento as any);
    expect(service.getMovimientos()).toEqual([movimiento]);
  });
});
