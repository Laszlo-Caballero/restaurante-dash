import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ComidaPage } from './comida-page/comida-page';
import { Login } from './login/login';
import { Dashboard } from '../components/layout/dashboard/dashboard';
import { authGuard } from '../guards/auth-guard';
import { GaleriaPage } from './galeria-page/galeria-page';
import { adminGuard } from '../guards/admin-guard';
import { CrearComida } from './comida-page/crear-comida/crear-comida';
import { CategoriasPage } from './categorias-page/categorias-page';
import { DetalleComida } from './comida-page/detalle-comida/detalle-comida';
import { UsuariosPage } from './usuarios-page/usuarios-page';
import { MesasPage } from './mesas-page/mesas-page';
import { OrdenesPage } from './ordenes-page/ordenes-page';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'comidas',
        component: ComidaPage,
      },
      {
        path: 'galeria',
        component: GaleriaPage,
      },
      {
        path: 'categorias',
        component: CategoriasPage,
      },
      {
        path: 'comidas/detalles/:id',
        component: DetalleComida,
      },
      {
        path: 'mesas',
        component: MesasPage,
      },
      {
        path: 'ordenes',
        component: OrdenesPage,
      },
    ],
  },
  {
    path: '',
    component: Dashboard,
    canActivateChild: [authGuard, adminGuard],
    children: [
      {
        path: 'comidas/nueva-comida',
        component: CrearComida,
      },
      {
        path: 'usuarios',
        component: UsuariosPage,
      },
    ],
  },
  {
    path: 'auth/login',
    component: Login,
  },
];
