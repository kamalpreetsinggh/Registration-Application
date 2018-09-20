import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import{Routes,RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './notfound/notfound.component';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { ToastrModule } from 'ngx-toastr';
import { componentFactoryName } from '../../node_modules/@angular/compiler';
import { EmployeeService } from './employees/shared/employee.service';
import { QualificationService } from './employees/shared/qualification.service';
import { AuthguardService } from './employees/shared/authguard.service';

const routes:Routes=[{
  path:'',
  component:EmployeeComponent
},
{
  path:'List',
  component:EmployeeListComponent,
  canActivate:[AuthguardService]

},
{
  path:'**',
  component:NotfoundComponent


},

]

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    NotfoundComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [EmployeeService,QualificationService,AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
