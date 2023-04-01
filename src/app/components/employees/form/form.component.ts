import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { Photo } from '@capacitor/camera';

import { DataService, Employee } from '../../../services/employees/data.service';
import { PhotoService } from '../../../services/photo/photo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() dataServiceInstance: DataService;
  @Input() employee: Employee | undefined;

  isModalOpen: boolean;
  employeeForm: FormGroup;
  isEdit: boolean = false;

  generatedPicture: Photo;
  profileImg: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  supportURL: string;

  constructor(
    private alertController: AlertController,
    public photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.isEdit = this.employee ? true : false;

    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.isEdit ? this.employee?.firstName : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl(this.isEdit ? this.employee?.lastName : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      dob: new FormControl(this.isEdit ? this.employee?.dob : '', [
        Validators.required,
        Validators.pattern(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/
        ),
      ]),
      street: new FormControl(this.isEdit ? this.employee?.street : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      city: new FormControl(this.isEdit ? this.employee?.city : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      state: new FormControl(this.isEdit ? this.employee?.state : '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      jobTitle: new FormControl(this.isEdit ? this.employee?.jobTitle : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      phone: new FormControl(this.isEdit ? this.employee?.phone : '', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    if (this.isEdit)
      this.loadProfilePicture();
  }

  setFormModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async submitEmployeeForm() {

    // form validator
    if (!this.employeeForm.valid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    // data persistance
    let submittedId;
    if (!this.isEdit) {
      submittedId = this.dataServiceInstance.addEmployee({
        id: this.dataServiceInstance.getNextId(),
        firstName: this.employeeForm.get('firstName')?.value,
        lastName: this.employeeForm.get('lastName')?.value,
        dob: this.employeeForm.get('dob')?.value,
        street: this.employeeForm.get('street')?.value,
        city: this.employeeForm.get('city')?.value,
        state: this.employeeForm.get('state')?.value,
        jobTitle: this.employeeForm.get('jobTitle')?.value,
        phone: this.employeeForm.get('phone')?.value,
      });
    } else {
      submittedId = this.dataServiceInstance.updEmployee({
        id: this.employee != undefined ? this.employee?.id : this.dataServiceInstance.getNextId(),
        firstName: this.employeeForm.get('firstName')?.value,
        lastName: this.employeeForm.get('lastName')?.value,
        dob: this.employeeForm.get('dob')?.value,
        street: this.employeeForm.get('street')?.value,
        city: this.employeeForm.get('city')?.value,
        state: this.employeeForm.get('state')?.value,
        jobTitle: this.employeeForm.get('jobTitle')?.value,
        phone: this.employeeForm.get('phone')?.value,
      });
    }

    // storage persistance
    if (submittedId !== null) {
      let resetedImg = this.profileImg.includes('demos/avatar');

      if (this.isEdit) {
        if (this.loadProfilePicture) {
          if (!resetedImg && this.generatedPicture)
            await this.photoService.persistPicture(this.generatedPicture, submittedId);
          if (resetedImg)
            await this.photoService.deletePicture(this.employee.id);
        }
      } else {
        if (!resetedImg) {
          await this.photoService.persistPicture(this.generatedPicture, submittedId);
          this.profileImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
          this.employeeForm.reset();
        }
      }
    }

    this.setFormModalOpen(false);
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 1);
  }

  async loadProfilePicture() {
    let profilePic = await this.photoService.fetchByUserID(this.employee.id);
    if (profilePic) {
      this.profileImg = profilePic.base64;
      return true;
    } else return false;
  }

  async renderPicture() {
    this.generatedPicture = await this.photoService.openCameraPlugin();
    this.profileImg = await this.photoService.readAsBase64(this.generatedPicture);
  }

  async resetPicture() {
    this.generatedPicture = null;
    this.profileImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerEmployee = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            
            if (this.employee === undefined)
              return;

            if (this.loadProfilePicture())
              await this.photoService.deletePicture(this.employee.id);

            let removed = this.dataServiceInstance.rmvEmployee(this.employee.id);

            if (removed)
              this.router.navigateByUrl('/');
          },
        },
      ],
    });

    await alert.present();
  }
}
