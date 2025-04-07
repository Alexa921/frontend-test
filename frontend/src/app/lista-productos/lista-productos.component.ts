import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {
  productos = [
    { nombre: 'Zapatillas Nike', precio: 120 },
    { nombre: 'Zapatillas Adidas', precio: 150 },
    { nombre: 'Zapatillas Puma', precio: 100 }
  ];
}

