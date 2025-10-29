import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ComidaPage } from './comida-page/comida-page';
import { Login } from './login/login';
import { Dashboard } from '../components/layout/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'comidas',
        component: ComidaPage,
      },
    ],
  },
  {
    path: 'auth/login',
    component: Login,
  },
];
