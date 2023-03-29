import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message } from '../../services/messages/data.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.page.html',
  styleUrls: ['./show-message.page.scss'],
})
export class ShowMessagePage implements OnInit {
  public message: Message | undefined;

  constructor(
    protected data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.data.getMessageById(parseInt(id, 10)).subscribe((message) => {
      this.message = message;
    });
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
