import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { DataService, Employee } from '../../services/employees/data.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: 'list-employees.page.html',
  styleUrls: ['list-employees.page.scss'],
})
export class ListEmployeesPage {
  constructor(protected data: DataService) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getEmployees(): Employee[] {
    return this.data.getEmployees();
  }
}
