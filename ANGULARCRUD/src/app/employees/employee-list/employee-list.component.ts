import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { EmployeeService } from '../shared/employee.service'
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Qualification } from '../shared/qualification';
import { QualificationService } from '../shared/qualification.service';
import { debug } from 'util';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private qualificationService: QualificationService, private toastr: ToastrService, private router:Router) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();


  }
  Board = ["CBSE", "ICSE", "RajasthanBoard","UPES","GSIPU","UPTU"];
  Year = ["2012", "2013", "2014", "2015", "2016","2017","2018"];
qualificationdata=[];

  yearValue: number;
  boardValue: string;
  MarksValue: number;
  empCode: number;
  modal: any;



  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);;
  }
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
    
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
    this.modal = new Qualification(this.qualificationService.getEmpID(), this.yearValue, this.boardValue, this.MarksValue);
    console.log(this.modal)
     this.yearValue=null;
     this.boardValue="";
     this.MarksValue=null;
   this.qualificationService.AddQualification(this.modal)
   this.qualificationdata.push(this.modal)
   console.log(this.qualificationdata,"ok")



  }
  onAdd() {
      this.qualificationService.postQualificationList(this.qualificationService.EmployeeQualificationList)
        .subscribe(data => {  
          this.toastr.success('New Record Added Succcessfully', 'Qualification Register');

        })
  }
  deleteFieldValue(index) {
    this.qualificationdata.splice(index, 1);
     this.qualificationService.getEmpID;
     this.qualificationService.DeleteQualification(index);
  }



  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id)
        .subscribe(x => {
          this.employeeService.getEmployeeList();
          this.toastr.warning("Deleted Successfully", "Employee Register");
        })
    }
  }

  signOut()
  {
    localStorage.clear();
    this.router.navigate(['/']);

  }
}
