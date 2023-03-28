import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMessagesPage } from './list-messages.page';

const routes: Routes = [
  {
    path: '',
    component: ListMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMessagesPageRoutingModule {}
