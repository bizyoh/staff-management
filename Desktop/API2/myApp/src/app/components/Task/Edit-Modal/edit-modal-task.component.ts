import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { format } from "date-fns";
import { Task } from "src/app/entity/Task";
import { TaskService } from "src/app/services/task.service";

@Component({
    selector: 'task-modal',
    templateUrl: './edit-modal-task.component.html',
    styleUrls: ['./edit-modal-task.component.css'],
  })

export class EditModelTaskComponent {
    @Input() task:Task;
    tasks :Task[];
    message = 'Edit Task';
    name: string;
    editTaskForm : FormGroup;
    showPickerStartDate = false;
    showPickerEndDate = false;
    createTaskForm : FormGroup;
    selectedTask : number;
    parentID:number;
    startDateValue = format(new Date(),'yyyy-MM-dd');
    endDateValue = format(new Date(),'yyyy-MM-dd');
    constructor(
        private readonly taskService : TaskService,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private alertController: AlertController,
        private router : Router,
        ){
        }
    ngOnInit(){
        console.log(this.task);
        this.startDateValue=format(new Date( this.task.StartDate),'yyyy-MM-dd');
        this.endDateValue= format(new Date( this.task.EndDate),'yyyy-MM-dd')
        this.getAllTasksExceptID();
        this.editTaskForm = this.formBuilder.group({
            id:this.task.Id,
            parentId:this.parentID,
            label: this.task.Label,
            type: this.task.Type,
            name: this.task.Name,
            startDate:this.startDateValue,
            endDate:this.endDateValue,
            duration: this.task.Duration,
            progress:this.task.Progress,
            isUnscheduled:this.task.IsUnscheduled
        })
      }
      getAllTasksExceptID(){
        this.taskService.getAll().then(
          res=>{
              var data =  res as Task[]
              this.tasks = data.filter(x=>x.Id != this.task.Id);
          }
        );
      }
      cancel() {
        this.modalCtrl.dismiss(null, 'cancel');
      }
      confirm() {
        this.modalCtrl.dismiss(this.name, 'cancel');
      }
      onSubmit(): void {
        // Process checkout data here
        let taskModel : Task ={
          Id : this.task.Id,
          ParentId : this.editTaskForm.value.ParentId,
          Label : this.editTaskForm.value.Label,
          Type : this.editTaskForm.value.Type,
          Name : this.editTaskForm.value.Name,
          StartDate :  this.startDateValue,
          EndDate : this.endDateValue,
          Duration : this.editTaskForm.value.Duration,
          Progress : this.editTaskForm.value.Progress,
          IsUnscheduled:this.task.IsUnscheduled
        };
        if(this.editTaskForm.value.id>0){
          this.taskService.edit(this.editTaskForm.value.id, taskModel).then(
            res=>{
              let rs  = res as boolean;
              if(rs){
                this.modalCtrl.dismiss(taskModel,'confirm');
              }
            } )
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
}