import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private peticion: PeticionService) {}

  nombre: string = "";
  email: string = "";
  password: string = "";

  Registrar() {

    if(this.nombre == ""){
      Notiflix.Notify.failure("El campo del nombre es obligatorio");
      return false
    }

    if(this.email == ""){
      Notiflix.Notify.failure("El campo del email es obligatorio");
      return false
    }

    if(this.password == ""){
      Notiflix.Notify.failure("El campo del password es obligatorio");
      return false
    }

    const post = {
      host: this.peticion.urlHost, 
      path: "/usuarios/registrar", 
      payload: {
        nombre: this.nombre,
        email: this.email,
        password: this.password
      }
    };
  
    this.peticion.Post(post.host + post.path, post.payload)
      .then((respuesta:any) => {
        console.log("Respuesta del servidor:", respuesta);
        if(respuesta.state == false) {
          Notiflix.Notify.failure(respuesta.mensaje)
        }
        else {
          Notiflix.Notify.success(respuesta.mensaje)
        }
      })
      return true
  }
}
