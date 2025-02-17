import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage), canActivate: [authGuard]
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report.page').then( m => m.ReportPage), canActivate: [authGuard]
  },
  {
    path: 'input',
    loadComponent: () => import('./pages/input/input.page').then( m => m.InputPage), canActivate: [authGuard]
  },
  {
    path: 'transaction/:id',
    loadComponent: () => import('./pages/transaction/transaction.page').then( m => m.TransactionPage), canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'user',
    loadComponent: () => import('./pages/user/user.page').then( m => m.UserPage)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./pages/accounts/accounts.page').then( m => m.AccountsPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'types',
    loadComponent: () => import('./pages/types/types.page').then( m => m.TypesPage)
  },


];
