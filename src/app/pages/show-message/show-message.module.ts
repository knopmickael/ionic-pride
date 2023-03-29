import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ShowMessagePage } from './show-message.page';
import { ShowMessagePageRoutingModule } from './show-message-routing.module';
import { MessagesComponentsModule } from '../../components/messages/messages-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MessagesComponentsModule,
    ShowMessagePageRoutingModule
  ],
  declarations: [ShowMessagePage]
})
export class ShowMessagePageModule {}
