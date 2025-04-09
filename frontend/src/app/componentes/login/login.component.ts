import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { PeticionService } from '../../servicios/peticion.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private peticion: PeticionService, private router: Router) {}

  email: string = "";
  password: string = "";

  login() {
    if (this.email == "") {
      Notiflix.Notify.failure("El campo del email es obligatorio");
      return false;
    }

    if (this.password == "") {
      Notiflix.Notify.failure("El campo del password es obligatorio");
      return false;
    }

    const post = {
      host: this.peticion.urlHost,
      path: "/usuarios/login",
      payload: {
        email: this.email,
        password: this.password
      }
    };

    this.peticion.Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        console.log("Respuesta del servidor:", respuesta);
        if (respuesta.state == false) {
          Notiflix.Notify.failure(respuesta.mensaje);
        } else {
          Notiflix.Notify.success("Inicio de sesión exitoso");
          localStorage.setItem("email", this.email);
          this.router.navigate(['dashboard']);
        }
      });

    return true;
  }

}


