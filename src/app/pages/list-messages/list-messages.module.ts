import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ListMessagesPage } from './list-messages.page';
import { ListMessagesPageRoutingModule } from './list-messages-routing.module';
import { MessagesComponentsModule } from './components/messages-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MessagesComponentsModule,
    ListMessagesPageRoutingModule
  ],
  declarations: [ListMessagesPage]
})
export class ListMessagesPageModule {}
