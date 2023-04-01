import { Component, Input, OnInit } from '@angular/core';

import { Employee } from '../../../services/employees/data.service';
import { PhotoService } from '../../../services/photo/photo.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() employee?: Employee;

  profileImg: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(public photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadProfilePicture();
  }

  async loadProfilePicture() {
    let profilePic = await this.photoService.fetchByUserID(this.employee.id);
    if (profilePic)
      this.profileImg = profilePic.base64;
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
