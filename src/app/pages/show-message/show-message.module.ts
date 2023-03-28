import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowMessagePage } from './show-message.page';

import { IonicModule } from '@ionic/angular';

import { ShowMessagePageRoutingModule } from './show-message-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowMessagePageRoutingModule
  ],
  declarations: [ShowMessagePage]
})
export class ShowMessagePageModule {}
