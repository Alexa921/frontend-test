import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../services/peticion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
        this.productos = res.filter((item:any) => item.categoria === 'home')
      console.log(this.productos)  
      })  
  
    }
}
