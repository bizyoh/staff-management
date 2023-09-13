import { Component, Injectable } from '@angular/core';
import { Staff } from './entity/Staff';
import { StaffService } from './services/staff.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gantt, GanttStatic} from 'dhtmlx-gantt';
import { Routes, RouterModule } from '@angular/router'
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="Bai test";
  staffs : Staff[];
  staff: Staff;
  selectedStaff: number;
  
}
