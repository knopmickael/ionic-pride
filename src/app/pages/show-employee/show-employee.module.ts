import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ShowEmployeePage } from './show-employee.page';
import { ShowEmployeePageRoutingModule } from './show-employee-routing.module';
import { EmployeesComponentsModule } from '../../components/employees/employees-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EmployeesComponentsModule,
    ShowEmployeePageRoutingModule
  ],
  declarations: [ShowEmployeePage]
})
export class ShowEmployeePageModule {}
