import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { HttpClientTestingModule } from '@angular/common/http/testing';

declare var $: any;

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  constructor(private peticion: PeticionService) {}

  email: string = '';
  nombre: string = '';
  password: string = '';
  estado: string = 'Activo';

  datos: any[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/listarTodos',
    };

    this.peticion.Get(post.host + post.path).then((respuesta: any) => {
      this.datos = respuesta; 
    });
  }

  verInformacion(usuario: any) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.estado = usuario.estado;
    $('#exampleModal').modal('show');
  }

  Actualizar() {
    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/Actualizar',
      payload: {
        email: this.email,
        nombre: this.nombre,
        estado: this.estado,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        if (respuesta.state === true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.listarTodos();
          $('#exampleModal').modal('hide'); 
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Error al conectar con el servidor');
      });
  }

  
  Eliminar() {
    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/borrar',
      payload: {
        email: this.email,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        if (respuesta.state === true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.listarTodos();
          $('#exampleModal').modal('hide'); 
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Error al conectar con el servidor');
      });
  }

  Nuevo() {
    this.nombre = ""
    this.email = ""
    this.password = ""
    this.estado = "Activo"
    $('#exampleModal').modal('show')
  }

  Guardar() {
    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/registrar',
      payload: {
        email: this.email,
        nombre: this.nombre,
        password: this.password,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        if (respuesta.state === true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.listarTodos();
          $('#exampleModal').modal('hide'); 
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Error al conectar con el servidor');
      });
  }

}