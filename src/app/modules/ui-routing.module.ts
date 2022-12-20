// ANGULAR
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARDS
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginGuard } from '../core/guards/login.guard';

// CONSTANTS
import { ROUTE_CONSTANTS } from '../constants/route';


const routes: Routes = [
  {
    path: ROUTE_CONSTANTS.CONTAINER.APP,
    loadChildren: () => import('./app/app-modules.module').then((m) => m.AppModule),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.CONTAINER.AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: ROUTE_CONSTANTS.CONTAINER.ERROR,
    loadChildren: () => import('./errors/errors.module').then((m) => m.ErrorsModule),
  },
  { path: '', pathMatch: 'full', redirectTo: ROUTE_CONSTANTS.CONTAINER.AUTH },
  { path: '**', redirectTo: `/${ROUTE_CONSTANTS.CONTAINER.ERROR}` }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class UiModulesRouting { }
