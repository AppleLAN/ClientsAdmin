import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route Configuration
export const routes: Routes = [
  { path: '', loadChildren: './authModule/auth.module#AuthModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
