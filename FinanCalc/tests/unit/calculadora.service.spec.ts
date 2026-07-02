import { CalculadoraService } from '../../src/app/services/calculadora.service';

describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(() => {
    service = new CalculadoraService();
  });

  it('should calculate loan payment for nonzero interest', () => {
    const cuota = service.calcularPrestamo(10000, 12, 12);
    expect(cuota).toBeGreaterThan(0);
  });

  it('should divide evenly for zero interest', () => {
    const cuota = service.calcularPrestamo(12000, 0, 12);
    expect(cuota).toBe(1000);
  });
});
