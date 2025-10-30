import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ComidaPage } from './comida-page/comida-page';
import { Login } from './login/login';
import { Dashboard } from '../components/layout/dashboard/dashboard';
import { authGuard } from '../guards/auth-guard';
import { GaleriaPage } from './galeria-page/galeria-page';
import { adminGuard } from '../guards/admin-guard';
import { CrearComida } from './comida-page/crear-comida/crear-comida';

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
    ],
  },
  {
    path: 'auth/login',
    component: Login,
  },
];
