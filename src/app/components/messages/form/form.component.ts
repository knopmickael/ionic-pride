import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { DataService, Message } from '../../../services/messages/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  
  @Input() dataServiceInstance: DataService;
  @Input() msg: Message | undefined;

  isModalOpen: boolean;
  messageForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            
            if (this.msg === undefined)
              return;

            let removed = this.dataServiceInstance.rmvMessage(this.msg.id);

            if (removed) {
              this.router.navigateByUrl('/');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit(): void {

    this.isEdit = this.msg ? true : false;

    this.messageForm = new FormGroup({
      fromname: new FormControl(this.isEdit ? this.msg?.fromName : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      subject: new FormControl(this.isEdit ? this.msg?.subject : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      date: new FormControl(this.isEdit ? this.msg?.date : '', [
        Validators.required,
        Validators.pattern(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/
        ),
      ]),
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  submitMessageForm() {

    if (!this.messageForm.valid) {
      this.messageForm.markAllAsTouched();
      return;
    }

    let submitted;
    if (!this.isEdit) {
      submitted = this.dataServiceInstance.addMessage({
        id: this.dataServiceInstance.getNextId(),
        fromName: this.messageForm.get('fromname')?.value,
        subject: this.messageForm.get('subject')?.value,
        date: this.messageForm.get('date')?.value,
        read: false,
      });
    } else {
      submitted = this.dataServiceInstance.updMessage({
        id: this.msg != undefined ? this.msg?.id : this.dataServiceInstance.getNextId(),
        fromName: this.messageForm.get('fromname')?.value,
        subject: this.messageForm.get('subject')?.value,
        date: this.messageForm.get('date')?.value,
        read: this.msg != undefined ? this.msg?.read : false,
      });
    }

    if (submitted) this.setOpen(false);
  }
}
