import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { format } from "date-fns";
import { Staff } from "src/app/entity/Staff";
import { Task } from "src/app/entity/Task";
import { StaffService } from "src/app/services/staff.service";
import { TaskService } from "src/app/services/task.service";

@Component({
    selector: 'task-modal',
    templateUrl: './edit-modal-task.component.html',
    styleUrls: ['./edit-modal-task.component.css'],
  })

export class EditModelTaskComponent {
    @Input() task:Task;
    tasks :Task[];
    staffs: Staff[];
    staffsSelected : any;
    message = 'Edit Task';
    name: string;
    editTaskForm : FormGroup;
    showPickerStartDate = false;
    showPickerEndDate = false;
    selectedTask : number;
    parentID?:number;
    startDateValue = format(new Date(),'yyyy-MM-dd');
    endDateValue = format(new Date(),'yyyy-MM-dd');
    constructor(
        private readonly taskService : TaskService,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private alertController: AlertController,
        private router : Router,
        private readonly staffService : StaffService,
        ){
        }
    ngOnInit(){
        this.staffsSelected = this.task.StaffIds;
        this.parentID = this.task.ParentId;
        this.startDateValue=format(new Date( this.task.StartDate),'yyyy-MM-dd');
        this.endDateValue= format(new Date( this.task.EndDate),'yyyy-MM-dd')
        this.getAllTasksExceptID();
        this.getAllStaff();
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
            isUnscheduled:this.task.IsUnscheduled,
            staffIds : [this.task.StaffIds]
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
          ParentId : this.parentID,
          Label : this.editTaskForm.value.label,
          Type : this.editTaskForm.value.type,
          Name : this.editTaskForm.value.name,
          StartDate :  this.startDateValue,
          EndDate : this.endDateValue,
          Duration : this.editTaskForm.value.duration,
          Progress : this.editTaskForm.value.progress,
          IsUnscheduled:this.editTaskForm.value.isUnscheduled,
          StaffIds : this.staffsSelected
        };
        console.log(taskModel);
        console.log(this.editTaskForm)
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
      getAllStaff(){
        this.staffService.getAll().then(
          res=>{
            this.staffs  =  res as Staff[]
          }
        );
      }
      startDateChange(value:any){
        this.startDateValue = value;
      }
      endDateChange(value:any){
        this.endDateValue = value;
      }
      // changeToSelectedParentTask(value:any){
      //   this.parentID = value;
      // }
}