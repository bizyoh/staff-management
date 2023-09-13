import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { Task } from 'src/app/entity/Task';
import { StaffService } from 'src/app/services/staff.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './detail-task.component.html',
    styleUrls: ['./detail-task.component.css'],
  })
  export class DetailTaskComponent{
    editTaskForm : FormGroup;
    @Input() task:Task;
    constructor(
        private readonly taskSerivce : TaskService,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private alertController: AlertController,
        private router : Router,
        ){}
    ngOnInit(){
        this.editTaskForm = this.formBuilder.group({
            id:this.task.Id,
            parentId:this.task.ParentId,
            label: this.task.Label,
            type: this.task.Type,
            name: this.task.Name,
            startDate:this.task.StartDate,
            endDate:this.task.EndDate,
            duration: this.task.Duration,
            progress:this.task.Progress,
            isUnscheduled:this.task.IsUnscheduled
        })
      }
  }