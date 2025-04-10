import { Component } from '@angular/core';
import Notiflix from 'notiflix';
import { PeticionService } from '../../servicios/peticion.service';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  constructor(private peticion: PeticionService) {}

  _id: string = '';
  titulo: string = '';
  precio: number = 0;
  material: string = '';
  categoria: string = 'servicios';
  datos: any[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    const url = this.peticion.urlHost + '/servicios/listarTodos';
    this.peticion.Get(url).then((respuesta: any) => {
      this.datos = respuesta;
      console.log('📦 servicios:', this.datos);
    });
  }

  verInformacion(producto: any) {
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
      imagen: 'default.jpg'
    };

    const url = this.peticion.urlHost + '/servicios/actualizar/' + this._id;

    this.peticion.Put(url, datos).then((res: any) => {
      if (res.state) {
        Notiflix.Notify.success(res.mensaje);
        $('#exampleModal').modal('hide');
        this.listarTodos();
      } else {
        Notiflix.Notify.failure(res.mensaje);
      }
    }).catch((err) => {
      console.error('❌ Error al actualizar:', err);
      Notiflix.Notify.failure('Error al conectar con el servidor');
    });
  }

  Borrar() {
    const url = this.peticion.urlHost + '/servicios/borrar/' + this._id;

    this.peticion.Delete(url).then((respuesta: any) => {
      if (respuesta.state === true) {
        Notiflix.Notify.success(respuesta.mensaje || 'Producto eliminado');
        this.listarTodos();
        $('#exampleModal').modal('hide');
      } else {
        Notiflix.Notify.failure(respuesta.mensaje || 'No se pudo eliminar');
      }
    }).catch((err) => {
      console.error('❌ Error al borrar:', err);
      Notiflix.Notify.failure('Error al conectar con el servidor');
    });
  }

  Nuevo() {
    this._id = '';
    this.titulo = '';
    this.precio = 0;
    this.material = '';
    this.categoria = 'servicios';
    $('#exampleModal').modal('show');
  }

  Guardar() {
    const post = {
      titulo: this.titulo,
      precio: this.precio,
      material: this.material,
      categoria: this.categoria,
      imagen: 'default.jpg'
    };

    const url = this.peticion.urlHost + '/servicios/guardar';

    this.peticion.Post(url, post).then((respuesta: any) => {
      if (respuesta.state === true) {
        Notiflix.Notify.success(respuesta.mensaje || 'Producto guardado');
        this.listarTodos();
        $('#exampleModal').modal('hide');
      } else {
        Notiflix.Notify.failure(respuesta.mensaje || 'No se pudo guardar');
      }
    }).catch((err) => {
      console.error('❌ Error al guardar:', err);
      Notiflix.Notify.failure('Error al conectar con el servidor');
    });
  }
}
