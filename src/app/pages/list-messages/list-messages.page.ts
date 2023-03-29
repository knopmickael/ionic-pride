import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { DataService, Message } from '../../services/messages/data.service';

@Component({
  selector: 'app-list-messages',
  templateUrl: 'list-messages.page.html',
  styleUrls: ['list-messages.page.scss'],
})
export class ListMessagesPage {
  constructor(protected data: DataService) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}
