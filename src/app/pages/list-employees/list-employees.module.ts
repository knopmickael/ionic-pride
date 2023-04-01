import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ListEmployeesPage } from './list-employees.page';
import { ListEmployeesPageRoutingModule } from './list-employees-routing.module';
import { EmployeesComponentsModule } from '../../components/employees/employees-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EmployeesComponentsModule,
    ListEmployeesPageRoutingModule
  ],
  declarations: [ListEmployeesPage]
})
export class ListEmployeesPageModule {}
