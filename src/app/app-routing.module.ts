import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./pages/list-employees/list-employees.module').then( m => m.ListEmployeesPageModule)
  },
  {
    path: 'employees/:id',
    loadChildren: () => import('./pages/show-employee/show-employee.module').then( m => m.ShowEmployeePageModule)
  },
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
