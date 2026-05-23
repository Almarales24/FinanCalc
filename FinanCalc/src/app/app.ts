import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraPrestamos } from './components/calculadora-prestamos/calculadora-prestamos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculadoraPrestamos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FinanCalc');
}
