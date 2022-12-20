// ANGULAR
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// CONSTANTS
import { LayoutComponent } from 'src/app/_metronic/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        // loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      {
        path: 'history',
        // loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      {
        path: 'credit-history',
        // loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: '**', redirectTo: `dashboard` }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
