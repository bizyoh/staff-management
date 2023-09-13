import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { Task } from 'src/app/entity/Task';
import { StaffService } from 'src/app/services/staff.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'task-item',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
  })
  export class TaskComponent{
    tasks : Task[];
    createTaskForm : FormGroup
    constructor(
      private readonly taskService : TaskService,
      private formBuilder: FormBuilder,
      ){}
    ngOnInit(){
      this.createTaskForm = this.formBuilder.group({
          id:0,
          parentId:0,
          label: '',
          type: 0,
          name: '',
          startDate:'',
          endDate:'',
          duration: 0,
          progress:'',
          isUnscheduled:false
      })
      this.GetAllTasks();
    }
    GetAllTasks(){
      this.taskService.getAll().then(
        res=>{
            this.tasks =  res as Task[]
        }
      );
    }
    onSubmit(): void {
      // Process checkout data here
      let taskModel : Task ={
        ParentId: this.createTaskForm.value.parentId,
        Label: this.createTaskForm.value.label,
        Name: this.createTaskForm.value.name,
        Type: this.createTaskForm.value.type,
        StartDate: this.createTaskForm.value.startDate,
        EndDate: this.createTaskForm.value.endDate,
        Duration: this.createTaskForm.value.duration,
        Progress: this.createTaskForm.value.progress,
        IsUnscheduled: this.createTaskForm.value.isUnscheduled
      };
      this.taskService.create(taskModel).then(
        res=>{
          let id :number  = res as number;
          if(id > 0 ){
            this.GetAllTasks();
          }
        }
        
      )
      this.createTaskForm.reset();
    }
  }