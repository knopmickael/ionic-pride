import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- Import the map operator

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip',
      date: '01/01/2023',
      id: 0,
      read: false,
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '02/01/2023',
      id: 1,
      read: true,
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '03/01/2023',
      id: 2,
      read: false,
    },
  ];

  private messagesSubject = new BehaviorSubject<Message[]>(this.messages);

  constructor() {}

  public getMessages(): Message[] {
    return this.messages.sort((a, b) => b.id - a.id);
  }

  public getMessageById(id: number): Observable<Message | undefined> {
    return this.messagesSubject.pipe(
      map((messages) => messages.find(m => m.id === id))
    );
  }

  public getNextId(): number {
    return this.messages.length;
  }

  public addMessage(msg: Message): boolean {
    this.messages.push(msg);
    this.messagesSubject.next(this.messages);
    return this.getMessageById(msg.id) !== undefined ? true : false;
  }

  public updMessage(msg: Message): boolean {
    let foundIndex = this.messages.findIndex(m => m.id === msg.id);
    if (foundIndex !== -1) {
      this.messages[foundIndex] = msg;
      this.messagesSubject.next(this.messages);
      return true;
    }
    return false;
  }

  public rmvMessage(id: number): boolean {
    let foundIndex = this.messages.findIndex(m => m.id === id);
    if (foundIndex !== -1) {
      delete this.messages[foundIndex];
      return true;
    }
    return false;
  }
}
