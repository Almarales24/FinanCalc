import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { FinanzasService } from '../services/finanzas';
import { CalculadoraService } from '../services/calculadora.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficos.html',
})
export class GraficosComponent implements AfterViewInit, OnDestroy {
  private graficoGastos: Chart | null = null;
  private graficoPrestamo: Chart | null = null;
  private suscripcionFinanzas: Subscription | null = null;
  private suscripcionPrestamo: Subscription | null = null;

  constructor(
    private finanzasService: FinanzasService,
    private calculadoraService: CalculadoraService
  ) {}

  ngAfterViewInit(): void {
    this.actualizarGraficoGastos();

    this.suscripcionFinanzas = this.finanzasService.movimientos$.subscribe(() => {
      this.actualizarGraficoGastos();
    });

    this.suscripcionPrestamo = this.calculadoraService.resultado$.subscribe(resultado => {
      if (resultado) {
        const capital = resultado.totalPagar - resultado.totalIntereses;
        this.actualizarGraficoPrestamo(capital, resultado.totalIntereses);
      }
    });
  }

  actualizarGraficoGastos(): void {
    const movimientos = this.finanzasService.getMovimientos();
    const gastos = movimientos.filter((m: any) => m.tipo === 'gasto');

    const categorias: Record<string, number> = {};
    gastos.forEach((g: any) => {
      categorias[g.categoria] = (categorias[g.categoria] || 0) + g.monto;
    });

    const labels = Object.keys(categorias);
    const data = Object.values(categorias);

    if (this.graficoGastos) this.graficoGastos.destroy();

    const canvas = document.getElementById('graficaGastos') as HTMLCanvasElement;
    if (!canvas) return;

    this.graficoGastos = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280', '#EC4899', '#14B8A6'],
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  actualizarGraficoPrestamo(capital: number, intereses: number): void {
    if (this.graficoPrestamo) this.graficoPrestamo.destroy();

    const canvas2 = document.getElementById('graficaPrestamo') as HTMLCanvasElement;
    if (!canvas2) return;

    this.graficoPrestamo = new Chart(canvas2, {
      type: 'bar',
      data: {
        labels: ['Total'],
        datasets: [
          { label: 'Capital', data: [capital], backgroundColor: '#3B82F6' },
          { label: 'Intereses', data: [intereses], backgroundColor: '#EF4444' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  ngOnDestroy(): void {
    this.graficoGastos?.destroy();
    this.graficoPrestamo?.destroy();
    this.suscripcionFinanzas?.unsubscribe();
    this.suscripcionPrestamo?.unsubscribe();
  }
}