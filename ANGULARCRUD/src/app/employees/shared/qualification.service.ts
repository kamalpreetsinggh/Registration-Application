import { Injectable } from '@angular/core';
import { Qualification } from './qualification';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
@Injectable()
export class QualificationService {
  empID: number;
  qualificationList: Qualification[];
  EmployeeQualificationList=[]
  constructor(private http: Http) { }
  getQualificationList() {
    this.http.get('http://localhost:28750/api/Qualifications')
      .map((data: Response) => {
        return data.json() as Qualification[];
      }).toPromise().then(x => {
        this.qualificationList = x;
      })
  } 

  postQualificationList(EmployeeQualificationList){
    var body = JSON.stringify(EmployeeQualificationList);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:28750/api/Qualifications',body,requestOptions).map(x => x.json());
  }
  
  getEmpID() {
    return this.empID;
  }
  DeleteQualification(index)
  {
    this.EmployeeQualificationList.splice(index,1);
    }
  AddQualification(modal:Qualification){
    modal.EmpCode=this.empID
    console.log(this.empID)
    console.log(modal)
    this.EmployeeQualificationList.push(modal)
    console.log(this.EmployeeQualificationList)
  }
}
