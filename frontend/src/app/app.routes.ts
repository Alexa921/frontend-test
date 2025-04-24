import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/pages/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ProductsComponent } from './componentes/products/products.component';

import { HombreComponent } from './componentes/pages/hombre/hombre.component';
import { MujerComponent } from './componentes/pages/mujer/mujer.component';
import { NinoComponent } from './componentes/pages/nino/nino.component';
import { DescuentosComponent } from './componentes/pages/descuentos/descuentos.component';
import { PageNotFoundComponent } from './componentes/pages/page-not-found/page-not-found.component';
import { ProductosComponent } from './componentes/pages/productos/productos.component';

export const routes: Routes = [
    {path:"", component:HomeComponent, pathMatch:"full"},
    {path:"registro", component:RegistroComponent, pathMatch:"full"},
    {path:"login", component:LoginComponent, pathMatch:"full"},
    {path:"dashboard", component:DashboardComponent, pathMatch:"full"},
    {path:"usuarios", component:UsuariosComponent, pathMatch:"full"},
    {path:"products", component:ProductsComponent, pathMatch:"full"},

    { path: "inicio", title:"ZenRun", component: HomeComponent },
    { path: "productos", title:"Novedades", component: ProductosComponent },
    { path: "hombre", title:"Hombre", component: HombreComponent },
    { path: "mujer", title:"Mujer", component: MujerComponent },
    { path: "nino", title:"Nino", component: NinoComponent },
    { path: "descuentos", title:"Descuentos", component: DescuentosComponent },
    { path: "", pathMatch: "full", redirectTo: "inicio" },
    { path: "**", title: "PageNotFound", component: PageNotFoundComponent },
];
