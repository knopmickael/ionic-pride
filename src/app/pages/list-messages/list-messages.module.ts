import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ListMessagesPage } from './list-messages.page';
import { ListMessagesPageRoutingModule } from './list-messages-routing.module';
import { MessageComponentModule } from './components/messages-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    ListMessagesPageRoutingModule
  ],
  declarations: [ListMessagesPage]
})
export class ListMessagesPageModule {}
