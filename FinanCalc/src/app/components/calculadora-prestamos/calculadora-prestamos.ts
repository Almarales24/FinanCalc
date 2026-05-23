import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculadoraService } from '../../services/calculadora.service';
import { ResultadoCalculo } from '../../models/prestamo.model';

@Component({
  selector: 'app-calculadora-prestamos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calculadora-prestamos.html',
  styleUrl: './calculadora-prestamos.css',
})
export class CalculadoraPrestamos {
  formulario: FormGroup;
  resultado: ResultadoCalculo | null = null;

  constructor(
    private fb: FormBuilder,
    private calculadoraService: CalculadoraService
  ) {
    this.formulario = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]],
      tasaInteres: ['', [Validators.required, Validators.min(0)]],
      meses: ['', [Validators.required, Validators.min(1)]],
    });
  }

  calcular() {
    if (this.formulario.valid) {
      const { monto, tasaInteres, meses } = this.formulario.value;
      const cuotaMensual = this.calculadoraService.calcularPrestamo(
        monto,
        tasaInteres,
        meses
      );
      const totalAPagar = cuotaMensual * meses;
      const totalInteres = totalAPagar - monto;

      this.resultado = {
        cuotaMensual: Math.round(cuotaMensual * 100) / 100,
        totalAPagar: Math.round(totalAPagar * 100) / 100,
        totalInteres: Math.round(totalInteres * 100) / 100,
      };
    }
  }

  limpiar() {
    this.formulario.reset();
    this.resultado = null;
  }
}
