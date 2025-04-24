import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../../services/peticion.service';

declare var $: any;

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  constructor(private peticion: PeticionService) {}

  // Definimos la variable 'data' para contener los productos
  data: any[] = [];

  // Variables para los campos del producto
  idseleccionado: string = '';
  codigo: number = 0;
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  cantidad: number = 0;
  categoria: string = '';
  foto: string = '';

  // Se ejecuta cuando se inicializa el componente
  ngOnInit(): void {
    this.ListarTodos();  // Cargamos los productos al iniciar
  }

  // Método para listar todos los productos
  ListarTodos() {
    let post = {
      host: this.peticion.urlHost,
      path: '/productos/ListarTodos',
    };

    this.peticion.Get(post.host + post.path).then((res: any) => {
      this.data = res.filter((item: any) => item.categoria === 'productos');  // Filtramos los productos por categoría
    });
  }

  // Método para seleccionar un producto (lo carga en el formulario para editar)
  SeleccionarId(id: string) {
    let post = {
      host: this.peticion.urlHost,
      path: '/productos/ListarId',
      payload: { id },
    };

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      const item = res[0];  // Usamos el primer item de la respuesta

      if (item) {
        // Asignamos los valores del producto seleccionado al formulario
        this.idseleccionado = item._id;
        this.codigo = item.codigo;
        this.nombre = item.nombre;
        this.descripcion = item.descripcion;
        this.precio = item.precio;
        this.cantidad = item.cantidad;
        this.categoria = item.categoria;
        this.foto = item.foto;

        // Mostramos el modal con los datos cargados
        $('#exampleModal').modal('show');
      }
    });
  }

  // Método para limpiar el formulario y abrir el modal vacío (desde el botón +)
  Nuevo() {
    // Limpiamos las variables del formulario
    this.idseleccionado = '';
    this.codigo = 0;
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.cantidad = 0;
    this.categoria = '';
    this.foto = '';

    // Mostramos el modal vacío
    $('#exampleModal').modal('show');
  }

  // Método para guardar un nuevo producto
  Guardar() {
    let post = {
      host: this.peticion.urlHost,
      path: '/productos/guardar',
      payload: {
        codigo: this.codigo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        cantidad: this.cantidad,
        categoria: this.categoria,
        foto: this.foto,
      },
    };

    this.peticion.Post(post.host + post.path, post.payload).then(() => {
      $('#exampleModal').modal('hide');  // Cerramos el modal
      this.ListarTodos();  // Recargamos la lista de productos
    });
  }

  // Método para actualizar un producto existente
  Actualizar() {
    let post = {
      host: this.peticion.urlHost,
      path: '/productos/actualizar/' + this.idseleccionado,
      payload: {
        codigo: this.codigo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        cantidad: this.cantidad,
        categoria: this.categoria,
        foto: this.foto,
      },
    };

    this.peticion.Put(post.host + post.path, post.payload).then(() => {
      $('#exampleModal').modal('hide');  // Cerramos el modal
      this.ListarTodos();  // Recargamos la lista de productos
    });
  }

  // Método para eliminar un producto
  Eliminar() {
    let post = {
      host: this.peticion.urlHost,
      path: '/productos/borrar/' + this.idseleccionado,
    };

    this.peticion.Delete(post.host + post.path).then(() => {
      $('#exampleModal').modal('hide');  // Cerramos el modal
      this.ListarTodos();  // Recargamos la lista de productos
    });
  }
}
