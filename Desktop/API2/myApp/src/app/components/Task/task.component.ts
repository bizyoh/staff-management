import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { Task } from 'src/app/entity/Task';
import { StaffService } from 'src/app/services/staff.service';
import { TaskService } from 'src/app/services/task.service';
import {format, parseISO} from 'date-fns';
import { CreateModelTaskComponent } from './Create-Modal/create-modal-task.component';

@Component({
    selector: 'task-item',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
  })
  export class TaskComponent{
    tasks : Task[];
    staffs: Staff[];
    parentID:number;
    showPickerStartDate = false;
    showPickerEndDate = false;
    createTaskForm : FormGroup;
    selectedTask : number;
    startDateValue = format(new Date(),'yyyy-MM-dd');
    endDateValue = format(new Date(),'yyyy-MM-dd');
    constructor(
      private readonly taskService : TaskService,
     
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController
      ){
      }
    ngOnInit(){
      this.createTaskForm = this.formBuilder.group({
          id:0,
          parentId:0,
          label: '',
          type: '',
          name: '',
          startDate:'',
          endDate:'',
          duration: 0,
          progress:'',
          isUnscheduled:false
      })
      this.getAllTasks();
    }
   
    getAllTasks(){
      this.taskService.getAll().then(
        res=>{
            this.tasks =  res as Task[]
        }
      );
    }
    filterByTerm(term: string,item:any){
      term = term.toLocaleLowerCase();
      return item.Name.toLocaleLowerCase().indexOf(term)>-1 ||  item.Label.toLocaleLowerCase().indexOf(term)>-1 ;
    }
    onSubmit(): void {
      // Process checkout data here
   
    }
    changeToSelectedTask(){
      if(this.selectedTask> 0 ){
        this.tasks=this.tasks.filter(x=>x.Id == this.selectedTask);
      }
      else{
        this.getAllTasks()
      }
      }
      startDateChange(value:any){
        this.startDateValue = value;
      }
      endDateChange(value:any){
        this.endDateValue = value;
      }
      changeToSelectedParentTask(value:any){
        this.parentID = value;
      }
      async openModalCreate() {
        const modal = await this.modalCtrl.create({
          component: CreateModelTaskComponent
        });
        modal.onDidDismiss().then(rs=>{
            if(rs.role==='confirm' && rs.data){
                this.tasks.push(rs.data as Task) ;
            }
        })
        modal.present();
        const { data, role } = await modal.onWillDismiss();
      }
  }