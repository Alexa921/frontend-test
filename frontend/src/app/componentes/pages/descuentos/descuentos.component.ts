import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../services/peticion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-descuentos',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './descuentos.component.html',
  styleUrl: './descuentos.component.css'
})
export class DescuentosComponent implements OnInit {
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
        this.productos = res.filter((item:any) => item.categoria === 'descuentos')
      console.log(this.productos)  
      })  
  
    }
}