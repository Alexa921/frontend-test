import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

export const routes: Routes = [
    {path:"", component:HomeComponent, pathMatch:"full"},
    {path:"registro", component:RegistroComponent, pathMatch:"full"},
    {path:"login", component:LoginComponent, pathMatch:"full"},
    {path:"dashboard", component:DashboardComponent, pathMatch:"full"},
    {path:"usuarios", component:UsuariosComponent, pathMatch:"full"}
];
