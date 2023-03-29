import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../services/messages/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() dataServiceInstance: DataService;

  isModalOpen: boolean;
  messageForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      fromname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/
        )
      ])
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  closeForm() {
    this.messageForm.reset();
    this.setOpen(false);
  }

  submitMessageForm() {
    let submitted = this.dataServiceInstance.addMessage({
      id: this.dataServiceInstance.getNextId(),
      fromName: this.messageForm.get('fromname')?.value,
      subject: this.messageForm.get('subject')?.value,
      date: this.messageForm.get('date')?.value,
      read: false
    });
    
    if (submitted)
      this.closeForm();
  }
}
