import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from '../shared/employee.service'
import { ToastrService } from 'ngx-toastr'
import { QualificationService } from '../shared/qualification.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList=null
  constructor(private employeeService: EmployeeService, private qualificationService: QualificationService, private toastr: ToastrService, private routes: Router) { 
    
  }

  ngOnInit() {
    
    this.resetForm();
  }
  empID: number;
  message: string;

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();


    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: '',

    }
  }

  onSubmit(form: NgForm) {
    console.log(form.controls.EmpCode.value)
    if (form.value.EmployeeID == null) {
      this.employeeService.postEmployee(form.value)

        .subscribe(data => {
          
            this.employeeService.getEmployeeList();
            localStorage.setItem('key', data.EmpCode);
            this.toastr.success('New Record Added Succcessfully', 'Employee Register');
            this.empID = form.controls.EmpCode.value;
            this.qualificationService.empID = form.controls.EmpCode.value;
            this.routes.navigate(['List']);
            this.resetForm(form);
          
         
        }, err => {
          this.message = "Employee ID Already Exists";
        }
        )

    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.info('Record Updated Successfully!', 'Employee Register');
        });
    }
  }


}
