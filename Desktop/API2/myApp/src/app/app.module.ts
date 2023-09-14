import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StaffComponent } from './components/Staff/staff.component';
import { StaffService } from './services/staff.service';
import { BASE_URLService } from './services/baseurl.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { GanttComponent } from './components/gantt/gantt.component';
import { EditModalComponent } from './components/Staff/Edit-Modal/edit-modal-staff.component';
import { TaskComponent } from './components/Task/task.component';
import { DetailStaffComponent } from './components/Staff/DetailStaff/detail-staff.component';
import { DetailTaskComponent } from './components/Task/DetailTask/detail-task.component';
import { TaskService } from './services/task.service';
import { EditModelTaskComponent } from './components/Task/Edit-Modal/edit-modal-task.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    GanttComponent,
    EditModalComponent,
    TaskComponent,
    DetailStaffComponent,
    DetailTaskComponent,
    EditModelTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  providers: [StaffService,BASE_URLService ,TaskService,DatePipe ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    
})
export class AppModule { }
