import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/Task/task.component';
import { StaffComponent } from './components/Staff/staff.component';

const routes: Routes = [
  {path:'',component:StaffComponent},
  {path:'staff',component:StaffComponent},
  {path:'task',component:TaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
