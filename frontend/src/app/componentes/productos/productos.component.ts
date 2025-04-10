import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
declare var $: any;

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  constructor(private peticion: PeticionService) {}

  _id: string = '';
  titulo: string = '';
  precio: number = 0;
  material: string = '';
  categoria: string = 'productos';

  datos: any[] = [];
  productoSeleccionado: any = null;

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    const url = this.peticion.urlHost + '/productos/listarTodos';

    this.peticion.Get(url).then((respuesta: any) => {
      this.datos = respuesta;
      console.log('📦 Productos:', this.datos);
    });
  }

  verInformacion(producto: any) {
    this.productoSeleccionado = producto; 
    this._id = producto._id;
    this.titulo = producto.titulo;
    this.precio = producto.precio;
    this.material = producto.material;
    this.categoria = producto.categoria;
    $('#exampleModal').modal('show');
  }

  Actualizar() {
    const datos = {
      _id: this._id,
      titulo: this.titulo,
      precio: this.precio,
      material: this.material,
      categoria: this.categoria,
      imagen: 'default.jpg',
    };

    console.log('🆔 ID del producto a actualizar:', this._id);

    const url = this.peticion.urlHost + '/productos/actualizar/' + this._id;

    this.peticion
      .Put(url, datos)
      .then((res: any) => {
        if (res.state) {
          Notiflix.Notify.success(res.mensaje);
          $('#exampleModal').modal('hide');
          this.listarTodos();
          this.productoSeleccionado = null; 
        } else {
          Notiflix.Notify.failure(res.mensaje);
        }
      })
      .catch((err) => {
        console.error('❌ Error al actualizar:', err);
        Notiflix.Notify.failure('Error al conectar con el servidor');
      });
  }

  Borrar() {
    const url = this.peticion.urlHost + '/productos/borrar/' + this._id;

    this.peticion
      .Delete(url)
      .then((respuesta: any) => {
        if (respuesta.state === true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.listarTodos();
          $('#exampleModal').modal('hide');
          this.productoSeleccionado = null; 
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Error al conectar con el servidor');
      });
  }

  Nuevo() {
    this.productoSeleccionado = null; 
    this._id = '';
    this.titulo = '';
    this.precio = 0;
    this.material = '';
    this.categoria = 'productos';
    $('#exampleModal').modal('show');
  }

  Guardar() {
    const post = {
      titulo: this.titulo,
      precio: this.precio,
      material: this.material,
      categoria: this.categoria,
      imagen: 'default.jpg',
    };

    const url = this.peticion.urlHost + '/productos/guardar';

    this.peticion.Post(url, post).then((respuesta: any) => {
      if (respuesta.state === true) {
        Notiflix.Notify.success(respuesta.mensaje);
        this.listarTodos();
        $('#exampleModal').modal('hide');
      } else {
        Notiflix.Notify.failure(respuesta.mensaje);
      }
    });
  }
}
