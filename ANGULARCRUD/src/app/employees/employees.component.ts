import { Component, OnInit } from '@angular/core';

import {EmployeeService} from './shared/employee.service'
import { QualificationService } from './shared/qualification.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  // providers:[EmployeeService,QualificationService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
  }

}
