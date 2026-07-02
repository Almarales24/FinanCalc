import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { FinanzasService } from '../services/finanzas';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficos.html',
})
export class GraficosComponent implements OnInit, OnDestroy {
  private grafico: Chart | null = null;
  private suscripcion: Subscription | null = null;

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit(): void {
    this.suscripcion = this.finanzasService.movimientos$.subscribe(() => {
      this.actualizarGrafico();
    });
  }

  actualizarGrafico(): void {
    const movimientos = this.finanzasService.getMovimientos();
    const gastos = movimientos.filter(m => m.tipo === 'gasto');

    const categorias: Record<string, number> = {};
    gastos.forEach(g => {
      categorias[g.categoria] = (categorias[g.categoria] || 0) + g.monto;
    });

    const labels = Object.keys(categorias);
    const data = Object.values(categorias);

    if (this.grafico) this.grafico.destroy();

    const canvas = document.getElementById('graficaGastos') as HTMLCanvasElement;
    if (!canvas) return;

    this.grafico = new Chart(canvas, {
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

  ngOnDestroy(): void {
    this.grafico?.destroy();
    this.suscripcion?.unsubscribe();
  }
}