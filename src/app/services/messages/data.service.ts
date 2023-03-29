import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '01/01/2023',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '02/01/2023',
      id: 1,
      read: true
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '03/01/2023',
      id: 2,
      read: false
    }
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public getNextId(): number {
    return this.messages.length;
  }

  public addMessage(msg: Message): boolean {
    this.messages.push(msg);
    return this.getMessageById(msg.id) !== undefined ? true : false;
  }
}
