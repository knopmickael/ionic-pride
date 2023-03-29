import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMessagePage } from './show-message.page';

import { IonicModule } from '@ionic/angular';

import { ShowMessagePageRoutingModule } from './show-message-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShowMessagePageRoutingModule
  ],
  declarations: [ShowMessagePage]
})
export class ShowMessagePageModule {}
