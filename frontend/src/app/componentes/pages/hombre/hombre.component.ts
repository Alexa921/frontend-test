import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../services/peticion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-hombre',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './hombre.component.html',
  styleUrl: './hombre.component.css'
})
export class HombreComponent implements OnInit {
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
        this.productos = res.filter((item:any) => item.categoria === 'hombre')
      console.log(this.productos)  
      })  
  
    }
}
