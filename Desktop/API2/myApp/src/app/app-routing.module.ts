import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/Task/task.component';
import { StaffComponent } from './components/Staff/staff.component';
import { GanttTaskComponent } from './components/Task/ganttTask/ganttTask.component';

const routes: Routes = [
  {path:'',component:StaffComponent},
  {path:'staff',component:StaffComponent},
  {path:'task',component:TaskComponent},
  {path:'chart',component:GanttTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
