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
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'licence-key',
        loadChildren: () => import('./licence-key/licence-key.module').then((m) => m.LicenceKeyModule),
      },
      {
        path: 'credit-history',
        loadChildren: () => import('./credit-history/credit-history.module').then((m) => m.CreditHistoryModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'billing',
        loadChildren: () => import('./billing/billing.module').then((m) => m.BillingModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: '**', redirectTo: `dashboard` }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
