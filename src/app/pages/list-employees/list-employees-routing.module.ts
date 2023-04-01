import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEmployeesPage } from './list-employees.page';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListEmployeesPageRoutingModule {}
