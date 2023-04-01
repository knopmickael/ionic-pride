import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule, RouterModule],
  declarations: [ListItemComponent, FormComponent],
  exports: [ListItemComponent, FormComponent]
})
export class EmployeesComponentsModule {}
