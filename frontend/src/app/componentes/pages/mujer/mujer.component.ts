import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../services/peticion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-mujer',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './mujer.component.html',
  styleUrl: './mujer.component.css'
})
export class MujerComponent implements  OnInit {
  constructor(private peticion: PeticionService){}
  
  
    productos:any[] = []
  
    ngOnInit(): void {
      this.ListarTodos()
    } 
  
    ListarTodos(){
      let post = {
        host: this.peticion.urlHost,
        path: "/productos/ListarTodos",
      }
  
      this.peticion.Get(post.host + post.path).then((res:any) => {
        this.productos = res.filter((item:any) => item.categoria === 'mujer')
      console.log(this.productos)  
      })  
  
    }
}
