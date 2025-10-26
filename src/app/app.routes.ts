import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ComidaPage } from './comida-page/comida-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'comidas',
    component: ComidaPage,
  },
];
