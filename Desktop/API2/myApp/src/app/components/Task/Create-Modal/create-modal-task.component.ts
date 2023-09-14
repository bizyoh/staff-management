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
    selector: 'task-modal-create',
    templateUrl: './create-modal-task.component.html',
    styleUrls: ['./create-modal-task.component.css'],
  })

export class CreateModelTaskComponent {
     task:Task;
    tasks :Task[];
    staffs : Staff[];
    staffsSelected : number[];
    message = 'Create Task';
    name: string;
    selectedStaffIds: string[];
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
        private readonly staffService : StaffService,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private alertController: AlertController,
        private router : Router,
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
        this.getAllStaff();
      }
      getAllStaff(){
        this.staffService.getAll().then(
          res=>{
            console.log(res);
            this.staffs  =  res as Staff[]
          }
        );
      }
      getAllTasks(){
        this.taskService.getAll().then(
          res=>{
            this.tasks  =  res as Task[]
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
            ParentId: this.parentID,
            Label: this.createTaskForm.value.label,
            Name: this.createTaskForm.value.name,
            Type: this.createTaskForm.value.type,
            StartDate: this.startDateValue,
            EndDate: this.endDateValue,
            Duration: parseInt(this.createTaskForm.value.duration),
            Progress: this.createTaskForm.value.progress,
            IsUnscheduled: this.createTaskForm.value.isUnscheduled,
            StaffIds : this.staffsSelected
          };
          this.taskService.create(taskModel).then(
            res=>{
              let id :number  = res as number;
              if(id > 0 ){
                taskModel.Id = id;
                this.modalCtrl.dismiss(taskModel,'confirm');
              }
            }
            
          )
          this.createTaskForm.reset();
      }
      
      startDateChange(value:any){
        console.log(value);
        this.startDateValue = value;
        console.log(this.startDateValue);
      }
      endDateChange(value:any){
        this.endDateValue = value;
      }
      changeToSelectedParentTask(value:any){
        this.parentID = value;
      }
}