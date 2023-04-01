import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { DataService, Employee } from '../../services/employees/data.service';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: 'list-employees.page.html',
  styleUrls: ['list-employees.page.scss'],
})
export class ListEmployeesPage implements OnInit {
  constructor(protected data: DataService, public photoService: PhotoService) {}

  async ngOnInit() {
    await this.photoService.clearData();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getEmployees(): Employee[] {
    return this.data.getEmployees();
  }
}
