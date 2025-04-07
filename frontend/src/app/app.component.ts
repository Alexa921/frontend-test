import { Component } from '@angular/core';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductosComponent],
  template: `<app-lista-productos></app-lista-productos>`,
})
export class AppComponent {}

