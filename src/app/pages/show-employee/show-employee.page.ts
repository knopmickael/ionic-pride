import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Employee } from '../../services/employees/data.service';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.page.html',
  styleUrls: ['./show-employee.page.scss'],
})
export class ShowEmployeePage implements OnInit {

  public employee: Employee | undefined;

  profileImg: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(
    protected data: DataService,
    private activatedRoute: ActivatedRoute,
    public photoService: PhotoService
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.data.getEmployeeById(parseInt(id, 10)).subscribe((employee) => {
      this.employee = employee;
    });
    await this.loadProfilePicture();
  }

  async loadProfilePicture() {
    let profilePic = await this.photoService.fetchByUserID(this.employee.id);
    if (profilePic) this.profileImg = profilePic.base64;
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
