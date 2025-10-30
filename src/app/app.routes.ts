import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ComidaPage } from './comida-page/comida-page';
import { Login } from './login/login';
import { Dashboard } from '../components/layout/dashboard/dashboard';
import { authGuardGuard } from '../guards/auth-guard-guard';
import { GaleriaPage } from './galeria-page/galeria-page';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivateChild: [authGuardGuard],
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
    path: 'auth/login',
    component: Login,
  },
];
