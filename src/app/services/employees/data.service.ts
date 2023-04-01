import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- Import the map operator

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  jobTitle: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private employees: Employee[] = [
    {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      dob: '01/01/1990',
      street: 'South Base',
      city: 'Dakota',
      state: 'US',
      jobTitle: 'Officer',
      phone: '555 555 5555'
    },
    {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      dob: '01/01/1990',
      street: 'North Base',
      city: 'Dakota',
      state: 'US',
      jobTitle: 'Developer',
      phone: '888 888 8888'
    },
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  constructor() {}

  public getEmployees(): Employee[] {
    return this.employees.sort((a, b) => b.id - a.id);
  }

  public getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.employeesSubject.pipe(
      map((employees) => employees.find(m => m.id === id))
    );
  }

  public getNextId(): number {
    return this.employees.length;
  }

  public addEmployee(msg: Employee): number | null {
    this.employees.push(msg);
    this.employeesSubject.next(this.employees);
    return this.getEmployeeById(msg.id) !== undefined ? msg.id : null;
  }

  public updEmployee(msg: Employee): number | null {
    let foundIndex = this.employees.findIndex(m => m.id === msg.id);
    if (foundIndex !== -1) {
      this.employees[foundIndex] = msg;
      this.employeesSubject.next(this.employees);
      return msg.id;
    }
    return null;
  }

  public rmvEmployee(id: number): boolean {
    let foundIndex = this.employees.findIndex(m => m.id === id);
    if (foundIndex !== -1) {
      delete this.employees[foundIndex];
      return true;
    }
    return false;
  }
}
