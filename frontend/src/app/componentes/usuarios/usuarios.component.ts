import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  constructor(private peticion: PeticionService) {}
  datos: any[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    const emailLogueado = localStorage.getItem('email'); 
    console.log("Email logueado:", emailLogueado);

    const post = {
      host: this.peticion.urlHost,
      path: "/usuarios/listarTodos"
    };

    this.peticion.Get(post.host + post.path).then((respuesta: any) => {
      console.log("Usuarios recibidos:", respuesta);
     
      this.datos = respuesta.map((usuario: any) => {
        if (usuario.email === emailLogueado) {
          return { ...usuario, estado: 'Activo' };
        } else {
          return { ...usuario, estado: 'Inactivo' };
        }
      });
    });
  }
  SeleccionarEmail(email:String) {
    const emailLogueado = localStorage.getItem('email'); 
    console.log("Email logueado:", emailLogueado);

    const post = {
      host: this.peticion.urlHost,
      path: "/usuarios/listarUnico",
      payload: {
        email: email
      }
    };

    this.peticion.Post(post.host + post.path, post.payload).then((respuesta: any) => {
      console.log("Usuarios recibidos:", respuesta);
     
      this.datos = respuesta.map((usuario: any) => {
        if (usuario.email === emailLogueado) {
          return { ...usuario, estado: 'Activo' };
        } else {
          return { ...usuario, estado: 'Inactivo' };
        }
      });
    });
  }
}



